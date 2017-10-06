"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const UPDATE_OPTIONS = {
    new: true
};
const TimesheetSchema = new mongoose.Schema({
    company_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    project_id: mongoose.Schema.Types.ObjectId,
    project_name: String,
    project_number: String,
    client_id: mongoose.Schema.Types.ObjectId,
    client_name: String,
    description: String,
    check_in: Date,
    check_out: Date,
    offlineId: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
// TimesheetSchema.plugin(location)
// TimesheetSchema.index({ pos: '2dsphere' })
// TimesheetSchema.index({ name: 'text' })
TimesheetSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    }
    else {
        next(error);
    }
});
exports.Model = mongoose.model('timesheet', TimesheetSchema);
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
        return exports.Model.findByIdAndUpdate(item._id, { $set: item }, UPDATE_OPTIONS)
            .where('company_id')
            .equals(user.company_id);
    },
    remove({ item, user }) {
        return exports.Model.findByIdAndRemove(item._id)
            .where('company_id')
            .equals(user.company_id);
    },
};
