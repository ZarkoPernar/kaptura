"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const client_1 = require("../models/client");
const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    }
};
async function getItem(request, response) {
    const urlParts = url.parse(request.url, true);
    const id = urlParts.query.id;
    const result = await client_1.default.getItem(id, request.user);
    response.status(200).json(result);
}
exports.getItem = getItem;
async function list(request, response) {
    const params = request.body || defaultListParams;
    if (!params.pages) {
        params.pages = defaultListParams.pages;
    }
    const query = client_1.Model.find();
    if (!request.user.company_id) {
        query
            .where('created_by')
            .equals(request.user._id);
    }
    else {
        query
            .where('company_id')
            .equals(request.user.company_id);
    }
    if (params.name !== undefined) {
        query.find({ name: { $regex: new RegExp(params.name, 'gi') } });
    }
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
    const newItem = Object.assign({}, item);
    const offlineId = newItem._id;
    delete newItem._id;
    try {
        const result = await client_1.default.create({
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
    const newItem = Object.assign({}, item);
    const result = await client_1.default.update({
        item: newItem,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.update = update;
async function remove(request, response) {
    const result = await client_1.default.remove({
        item: request.body,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.remove = remove;
