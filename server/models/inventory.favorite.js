"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { promisify } = require('util');
const inventory_item_1 = require("./inventory.item");
const InventoryFavoriteItemSchema = new mongoose.Schema(inventory_item_1.IBaseInventoryItemSchema, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});
InventoryFavoriteItemSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next(error);
    }
});
exports.InventoryFavoriteItemModel = mongoose.model('inventory_item_favorite', InventoryFavoriteItemSchema);
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
exports.default = createInvoiceItemModelActions(exports.InventoryFavoriteItemModel);
