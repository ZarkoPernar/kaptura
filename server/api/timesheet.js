"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const timesheet_1 = require("../models/timesheet");
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
    const result = await timesheet_1.default.getItem(id, request.user);
    response.status(200).json(result);
}
exports.getItem = getItem;
async function list(request, response) {
    const params = request.body || defaultListParams;
    params.pages = Object.assign({}, defaultListParams.pages, params.pages);
    const query = timesheet_1.Model.find()
        .where('company_id')
        .equals(request.user.company_id);
    applyFilters_1.default(params, query);
    console.log(params.pages.pageSize, params.pages.pageSize * (params.pages.pageNumber - 1));
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
    console.log(request.body);
    const newItem = convertDates_1.default(item, ['check_in', 'check_out']);
    const offlineId = newItem._id;
    delete newItem._id;
    try {
        const result = await timesheet_1.default.create({
            item: newItem,
            user: request.user,
            offlineId,
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
    const newItem = convertDates_1.default(item, ['check_in', 'check_out']);
    const result = await timesheet_1.default.update({
        item: newItem,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.update = update;
async function remove(request, response) {
    const result = await timesheet_1.default.remove({
        item: request.body,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.remove = remove;
