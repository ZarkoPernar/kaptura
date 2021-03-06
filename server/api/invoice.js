"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const api_1 = require("../socket/api");
const invoice_1 = require("../models/invoice");
const convertDates_1 = require("../utils/convertDates");
const applyFilters_1 = require("../utils/applyFilters");
const user_1 = require("../models/user");
const client_1 = require("../models/client");
const project_1 = require("../models/project");
const company_1 = require("../models/company");
const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    }
};
async function getItem(request, response) {
    const id = request.params.id;
    const result = await invoice_1.default.getItem(id, request.user);
    response.status(200).json(result);
}
exports.getItem = getItem;
async function list(request, response) {
    const params = request.body || defaultListParams;
    if (!params.pages) {
        params.pages = defaultListParams.pages;
    }
    const query = invoice_1.Model.find()
        .where('company_id')
        .equals(request.user.company_id);
    // if (params.name !== undefined) {
    //     query.find({ name: { $regex: new RegExp(params.name, 'gi',) } })
    // }
    applyFilters_1.default(params, query);
    const result = await query
        .sort({
        created_at: -1,
    })
        .skip(params.pages.pageSize * (params.pages.pageNumber - 1))
        .limit(params.pages.pageSize);
    response.status(200).json(result);
}
exports.list = list;
async function create(request, response) {
    const item = request.body;
    const newItem = convertDates_1.default(item, ['issue_date', 'due_date']);
    const offlineId = newItem._id;
    delete newItem._id;
    const invoiceCount = await invoice_1.Model
        .find({
        issue_date: {
            $gte: date_fns_1.startOfYear(new Date()),
        }
    })
        .where('company_id')
        .equals(request.user.company_id)
        .count();
    const [client, project, company, user,] = await Promise.all([
        client_1.default.getItem(item.client_id, request.user),
        project_1.default.getItem(item.project_id, request.user),
        company_1.default.getItem(request.user.company_id),
        user_1.default.findById(request.user._id),
    ]);
    try {
        const result = await invoice_1.default.create({
            item: Object.assign({}, newItem, { client,
                project,
                company, number: (invoiceCount + 1) + '/01/01', issued_by: {
                    user_id: user._id,
                    name: user.full_name,
                } }),
            offlineId,
            user: request.user,
        });
        response.status(200).json(result);
        api_1.emitCompanySocket(request.user.company_id.toString(), { type: 'invoice_create', payload: result }, request.user._id.toString());
    }
    catch (err) {
        response.status(412).json(err);
    }
}
exports.create = create;
async function update(request, response) {
    const item = request.body;
    const newItem = convertDates_1.default(item, ['issue_date', 'due_date']);
    const result = await invoice_1.default.update({
        item: newItem,
        user: request.user,
    });
    response.status(200).json(result);
    api_1.emitCompanySocket(request.user.company_id.toString(), { type: 'invoice_update', payload: result }, request.user._id.toString());
}
exports.update = update;
async function remove(request, response) {
    const result = await invoice_1.default.remove({
        item: request.body,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.remove = remove;
