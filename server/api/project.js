"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const api_1 = require("../socket/api");
const project_1 = require("../models/project");
const convertDates_1 = require("../utils/convertDates");
const applyFilters_1 = require("../utils/applyFilters");
const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    }
};
async function getItem(request, response) {
    const urlParts = url.parse(request.url, true);
    const id = urlParts.query.id;
    const result = await project_1.default.getItem(id, request.user);
    response.status(200).json(result);
}
exports.getItem = getItem;
async function list(request, response) {
    const params = request.body || defaultListParams;
    if (!params.pages) {
        params.pages = defaultListParams.pages;
    }
    const query = project_1.Model.find()
        .where('company_id')
        .equals(request.user.company_id);
    if (params.name !== undefined) {
        query.find({ name: { $regex: new RegExp(params.name, 'gi') } });
    }
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
    const newItem = convertDates_1.default(item, ['start_date', 'end_date']);
    const offlineId = newItem._id;
    delete newItem._id;
    try {
        const result = await project_1.default.create({
            item: newItem,
            offlineId,
            user: request.user,
        });
        api_1.emitCompanySocket(request.user.company_id.toString(), request.user._id.toString(), { type: 'project_create', payload: result });
        response.status(200).json(result);
    }
    catch (err) {
        response.status(412).json(err);
    }
}
exports.create = create;
async function update(request, response) {
    const item = request.body;
    const newItem = convertDates_1.default(item, ['start_date', 'end_date']);
    const result = await project_1.default.update({
        item: newItem,
        user: request.user,
    });
    api_1.emitCompanySocket(request.user.company_id.toString(), request.user._id.toString(), { type: 'project_update', payload: result });
    response.status(200).json(result);
}
exports.update = update;
async function remove(request, response) {
    const result = await project_1.default.remove({
        item: request.body,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.remove = remove;
