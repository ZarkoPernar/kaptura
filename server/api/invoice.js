"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const invoice_1 = require("../models/invoice");
const convertDates_1 = require("../utils/convertDates");
const applyFilters_1 = require("../utils/applyFilters");
const invoice_2 = require("../models/invoice");
const user_1 = require("../models/user");
const project_1 = require("../models/project");
const company_1 = require("../models/company");
const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    }
};
async function getItem(request, response) {
    const urlParts = url.parse(request.url, true);
    const id = urlParts.query.id;
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
    const [client, project, company, user,] = await Promise.all([
        invoice_2.default.getItem(item.client_id, request.user),
        project_1.default.getItem(item.project_id, request.user),
        company_1.default.getItem(request.user.company_id),
        user_1.default.findById(request.user._id),
    ]);
    const result = await invoice_1.default.create({
        item: Object.assign({}, newItem, { client,
            project,
            company,
            user }),
        offlineId,
        user: request.user,
    });
    try {
        const result = await invoice_1.default.create({
            item: newItem,
            offlineId,
            user: request.user,
        });
        response.status(200).json(result);
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
