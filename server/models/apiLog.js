"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ApiLogSchema = new mongoose.Schema({
    company_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    user_name: {
        required: true,
        type: String
    },
    api: {
        required: true,
        type: String
    },
    api_action: {
        required: true,
        type: String
    },
    method: {
        required: true,
        type: String
    },
    full_url: {
        required: true,
        type: String
    },
    payload: Object,
    error: Object,
    system_note: String,
});
exports.Model = mongoose.model('api_logs', ApiLogSchema);
const UPDATE_OPTIONS = { new: true };
exports.default = {
    getItem($id, user) {
        return exports.Model.findById($id);
    },
    list() {
        return exports.Model.find()
            .limit(100);
    },
    create({ apiRequest, user }) {
        let newItem = {
            user_id: user._id,
            user_name: user.full_name,
            company_id: user.company_id,
            method: apiRequest.method,
            api: apiRequest.api,
            api_action: apiRequest.api_action,
            full_url: apiRequest.full_url,
        };
        return new exports.Model(newItem).save();
    },
};
