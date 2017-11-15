"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { promisify } = require('util');
const UPDATE_OPTIONS = { new: true };
const InvoiceItemSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    client_id: mongoose.Schema.Types.ObjectId,
    project_id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: String,
    type: String,
    brand_name: String,
    quantity: Number,
    // price: mongoose.Schema.Types.Decimal128,
    price: Number,
    notes: String,
    offlineId: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
// InvoiceItemSchema.index({ name: 'text' })
InvoiceItemSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next(error);
    }
});
exports.Model = mongoose.model('invoice_item', InvoiceItemSchema);
function createInvoiceItemModelActions(model) {
    return {
        getItem($id, user) {
            return model.findById($id)
                .where('company_id')
                .equals(user.company_id);
        },
        create({ item, user, offlineId }) {
            let newItem = Object.assign({}, item, { offlineId, created_by: user._id, company_id: user.company_id });
            return new model(newItem).save();
        },
        update({ item, user }) {
            return model.findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then((doc) => {
                Object.assign(doc, item);
                return doc.save();
            });
        },
        remove({ item, user }) {
            return model.findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id);
        },
    };
}
exports.createInvoiceItemModelActions = createInvoiceItemModelActions;
exports.default = createInvoiceItemModelActions(exports.Model);
