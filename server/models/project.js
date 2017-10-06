"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { promisify } = require('util');
const default_1 = require("./default");
const UPDATE_OPTIONS = { new: true };
const ProjectStatusSchema = new mongoose.Schema({
    value: Number,
    label: String,
});
const ProjectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    number: String,
    company_id: mongoose.Schema.Types.ObjectId,
    client_id: mongoose.Schema.Types.ObjectId,
    client_name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    completed: Boolean,
    status: {
        type: ProjectStatusSchema,
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
ProjectSchema.plugin(default_1.location);
ProjectSchema.index({ pos: '2dsphere' });
ProjectSchema.index({ name: 'text' });
ProjectSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next(error);
    }
});
exports.Model = mongoose.model('project', ProjectSchema);
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
            // console.log(doc);
            return doc.save();
        });
    },
    remove({ item, user }) {
        return exports.Model.findByIdAndRemove(item._id)
            .where('company_id')
            .equals(user.company_id);
    },
};
