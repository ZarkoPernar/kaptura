"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const default_1 = require("./default");
const CompanySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    company_number: String,
    bank_account: String,
    email: String,
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
CompanySchema.plugin(default_1.location);
exports.Model = mongoose.model('company', CompanySchema);
exports.default = {
    getItem(id) {
        return exports.Model.findById(id);
    },
    update({ company, user }) {
        return exports.Model.findById(company._id)
            .then((doc) => {
            if (doc === null)
                return;
            Object.assign(doc, company);
            return doc.save();
        });
    }
};
