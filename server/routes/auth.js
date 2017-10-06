"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const user_1 = require("../models/user");
const company_1 = require("../models/company");
const localAuth_1 = require("../middleware/localAuth");
const ROUTE_PREFIX = '/auth';
function registerAuthRoutes(app) {
    // TODO: add password reset route
    app.post(ROUTE_PREFIX + '/register', function (request, response) {
        let company_id;
        if (!request.body.company_name) {
            return response.status(412).json({
                message: 'Company name is required'
            });
        }
        console.log('CompanyModel.create start', request.body);
        company_1.Model.create({
            name: request.body.company_name,
        })
            .then((company) => {
            console.log('CompanyModel.create done');
            company_id = company._id;
            request.body.username = request.body.email;
            console.log('Company created');
            user_1.default.register(new user_1.default({
                email: request.body.email,
                username: request.body.username,
                name: request.body.name,
                full_name: request.body.name,
                company_id
            }), request.body.password, function (err, user) {
                if (err) {
                    return response.status(412).json({ err });
                }
                console.log('User created');
                localAuth_1.localAuthenticate(request, response, function () {
                    response.status(200).json({ user, company });
                });
            });
        });
    });
    app.post(ROUTE_PREFIX + '/login', localAuth_1.localAuthenticate);
    app.get(ROUTE_PREFIX + '/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get(ROUTE_PREFIX + '/google/login', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get(ROUTE_PREFIX + '/google/callback', passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/korisnik',
    }));
}
exports.default = registerAuthRoutes;
