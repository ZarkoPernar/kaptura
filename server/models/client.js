"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const default_1 = require("./default");
const ClientSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    company_id: mongoose.Schema.Types.ObjectId,
    company_number: String,
    account_number: String,
    notes: String,
    offlineId: String,
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
ClientSchema.plugin(default_1.location);
ClientSchema.index({ pos: '2dsphere' });
ClientSchema.index({ name: 'text' });
exports.Model = mongoose.model('client', ClientSchema);
const UPDATE_OPTIONS = { new: true };
exports.default = {
    getItem($id, user) {
        return exports.Model.findById($id)
            .where('company_id')
            .equals(user.company_id);
    },
    create({ item, user, offlineId }) {
        let newItem = Object.assign({}, item, { offlineId, created_by: user._id, company_id: user.company_id });
        return new exports.Model(newItem).save();
    },
    update({ item, user }) {
        return exports.Model.findById(item._id)
            .where('company_id')
            .equals(user.company_id)
            .then((doc) => {
            Object.assign(doc, item);
            return doc.save();
        });
    },
    remove({ item, user }) {
        return exports.Model.findByIdAndRemove(item._id)
            .where('company_id')
            .equals(user.company_id);
    },
};
