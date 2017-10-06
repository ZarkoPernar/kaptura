"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const user_1 = require("../models/user");
const convertDates_1 = require("../utils/convertDates");
const defaultListParams = {};
async function getItem(request, response) {
    const urlParts = url.parse(request.url, true);
    const id = urlParts.query.id;
    const result = await user_1.default.getById(id);
    response.status(200).json(result);
}
exports.getItem = getItem;
async function list(request, response) {
    const params = request.body || defaultListParams;
    const query = user_1.default.find()
        .where('company_id')
        .equals(request.user.company_id);
    if (params.name !== undefined) {
        query.find({ name: { $regex: new RegExp(params.name, 'gi') } });
    }
    const result = await query;
    // .sort({
    //     created_at: -1,
    // })
    response.status(200).json(result);
}
exports.list = list;
async function create(request, response) {
    const item = request.body;
    const newUser = {
        offlineId: item._id,
        full_name: item.full_name,
        email: item.email,
        username: item.email,
        created_by: request.user._id,
        company_id: request.user.company_id,
    };
    user_1.default.register(new user_1.default(newUser), item.password, function (err, user) {
        if (err) {
            return response.status(412).json({ err });
        }
        response.status(200).json(user);
    });
}
exports.create = create;
async function update(request, response) {
    const item = request.body;
    const newItem = convertDates_1.default(item, ['start_date', 'end_date']);
    const result = await user_1.default.update({
        item: newItem,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.update = update;
async function remove(request, response) {
    const result = await user_1.default.remove({
        item: request.body,
        user: request.user,
    });
    response.status(200).json(result);
}
exports.remove = remove;
