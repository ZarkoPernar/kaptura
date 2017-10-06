"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const googleStrategy_1 = require("./config/googleStrategy");
const user_1 = require("./models/user");
function registerAuthStrategies(app) {
    passport.use(new LocalStrategy(user_1.default.authenticate()));
    passport.use(googleStrategy_1.default);
    passport.serializeUser(user_1.default.serializeUser());
    passport.deserializeUser(user_1.default.deserializeUser());
}
exports.default = registerAuthStrategies;
