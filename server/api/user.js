"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const company_1 = require("../models/company");
async function userInfo(request, response) {
    const [company, employees] = await Promise.all([
        company_1.default
            .getItem(request.user.company_id),
        user_1.default.find()
            .where('company_id')
            .equals(request.user.company_id)
    ]);
    const result = {
        user: request.user,
        company,
        employees,
    };
    response.status(200).json(result);
}
exports.userInfo = userInfo;
async function update(request, response) {
    if (request.user._id.toString() !== request.body._id) {
        response.status(412).json({
            message: 'Forbidden'
        });
    }
    else {
        const result = await user_1.default.findByIdAndUpdate(request.body._id, request.body);
        response.status(200).json(result);
    }
}
exports.update = update;
