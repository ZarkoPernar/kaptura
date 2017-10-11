"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { promisify } = require('util');
const UPDATE_OPTIONS = { new: true };
const InvoiceStatusSchema = new mongoose.Schema({
    value: Number,
    label: String,
});
const InvoiceSchema = new mongoose.Schema({
    company_id: mongoose.Schema.Types.ObjectId,
    client_id: mongoose.Schema.Types.ObjectId,
    project_id: mongoose.Schema.Types.ObjectId,
    number: String,
    due_date: Date,
    issue_date: Date,
    issue_place: String,
    project: {
        name: String,
        number: String,
        google_address: String,
    },
    client: {
        name: String,
        number: String,
        bank_number: String,
        company_number: String,
        google_address: String,
    },
    company: {
        name: String,
        company_number: String,
        bank_number: String,
        google_address: String,
    },
    issued_by: {
        name: String,
        user_id: mongoose.Schema.Types.ObjectId,
    },
    description: String,
    notes: String,
    terms: String,
    issued: Boolean,
    payment_received: Boolean,
    payment_type: String,
    payment_information: String,
    status: {
        type: InvoiceStatusSchema,
        default: {
            value: 0,
            label: 'Stvoreno',
        },
    },
    offlineId: String,
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
// InvoiceSchema.index({ name: 'text' })
InvoiceSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next(error);
    }
});
exports.Model = mongoose.model('invoice', InvoiceSchema);
function createInvoiceModelActions(model) {
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
exports.createInvoiceModelActions = createInvoiceModelActions;
exports.default = createInvoiceModelActions(exports.Model);
