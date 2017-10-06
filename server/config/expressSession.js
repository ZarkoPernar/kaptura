"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
};
