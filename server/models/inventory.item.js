"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { promisify } = require('util');
const UPDATE_OPTIONS = { new: true };
exports.IBaseInventoryItemSchema = {
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    type: String,
    brand_name: String,
    quantity: Number,
    price: mongoose.Schema.Types.Decimal128,
    // price: Number,
    offlineId: String,
};
const InventoryItemSchema = new mongoose.Schema(Object.assign({}, exports.IBaseInventoryItemSchema, { favorite_id: mongoose.Schema.Types.ObjectId }), {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
// InvoiceItemSchema.index({ name: 'text' })
InventoryItemSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next(error);
    }
});
exports.InventoryItemModel = mongoose.model('invoice_item', InventoryItemSchema);
function createInvoiceItemModelActions(model) {
    return {
        getItem($id, user) {
            return model
                .findById($id)
                .where('company_id')
                .equals(user.company_id);
        },
        create({ item, user, offlineId, }) {
            let newItem = Object.assign({}, item, { offlineId, created_by: user._id, company_id: user.company_id });
            return new model(newItem).save();
        },
        update({ item, user }) {
            return model
                .findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then(doc => {
                if (!doc)
                    return Promise.resolve(doc);
                Object.assign(doc, item);
                return doc.save();
            });
        },
        remove({ item, user }) {
            return model
                .findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id);
        },
    };
}
exports.createInvoiceItemModelActions = createInvoiceItemModelActions;
exports.default = createInvoiceItemModelActions(exports.InventoryItemModel);
