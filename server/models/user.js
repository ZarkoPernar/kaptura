"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
exports.userSchema = new Schema({
    company_id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    username: String,
    offlineId: String,
    google: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    email_confirmed: {
        type: Boolean,
        default: false,
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.userSchema
    .virtual('name')
    .get(function () {
    return this.full_name;
});
exports.userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true,
});
const model = mongoose.model('user', exports.userSchema);
exports.default = model;
