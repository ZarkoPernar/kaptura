"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const default_1 = require("./models/default");
mongoose.Promise = global.Promise;
mongoose.set('debug', JSON.parse(process.env.MONGO_DEBUG));
mongoose.plugin(default_1.modifiedBy);
function init(mongoUrl) {
    console.log(mongoUrl);
    return mongoose.connect(mongoUrl);
}
exports.default = init;
