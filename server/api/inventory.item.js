"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../socket/api");
const inventory_item_1 = require("../models/inventory.item");
const applyFilters_1 = require("../utils/applyFilters");
const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    },
};
async function getItem(request, response) {
    const id = request.params.id;
    const result = await inventory_item_1.default.getItem(id, request.user);
    response.status(200).json(result);
}
exports.getItem = getItem;
async function list(request, response) {
    const params = request.body || defaultListParams;
    if (!params.pages) {
        params.pages = defaultListParams.pages;
    }
    const query = inventory_item_1.InventoryItemModel.find()
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
    response.status(200).json({ data: result });
}
exports.list = list;
async function create(request, response) {
    const item = request.body;
    const newItem = Object.assign({}, item);
    const offlineId = newItem._id;
    delete newItem._id;
    try {
        const result = await inventory_item_1.default.create({
            item: newItem,
            offlineId,
            user: request.user,
        });
        response.status(200).json(result);
        api_1.emitCompanySocket(request.user.company_id.toString(), { type: 'invoice_item_create', payload: result }, request.user._id.toString());
    }
    catch (err) {
        response.status(412).json(err);
    }
}
exports.create = create;
async function update(request, response) {
    const item = request.body;
    const newItem = Object.assign({}, item);
    const result = await inventory_item_1.default.update({
        item: newItem,
        user: request.user,
    });
    response.status(200).json(result);
    api_1.emitCompanySocket(request.user.company_id.toString(), { type: 'invoice_item_update', payload: result }, request.user._id.toString());
}
exports.update = update;
async function remove(request, response) {
    const result = await inventory_item_1.default.remove({
        item: request.body,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.remove = remove;
