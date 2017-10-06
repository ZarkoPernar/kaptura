"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
exports.localAuthenticate = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
});
function localAuthMiddleware(request, response, next) {
    if (!request.isAuthenticated()) {
        response.redirect('/login');
    }
    else {
        next();
    }
}
exports.localAuthMiddleware = localAuthMiddleware;
