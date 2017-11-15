"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const localAuth_1 = require("../middleware/localAuth");
const prefix_1 = require("./prefix");
const project_1 = require("./project");
const client_1 = require("./client");
const invoice_1 = require("./invoice");
const invoice_item_1 = require("./invoice.item");
const timesheet_1 = require("./timesheet");
const user_1 = require("./user");
const auth_1 = require("./auth");
const employee_1 = require("./employee");
const company_1 = require("./company");
const loginFileLocation = path.resolve(__dirname + '/../views/login.html');
const registerFileLocation = path.resolve(__dirname + '/../views/register.html');
const indexFileLocation = path.resolve(process.cwd() + '/public/index.html');
const staticMiddleware = express.static(process.cwd() + '/public');
function registerRoutes(app) {
    app.get('/login', function (req, res) {
        res.sendFile(loginFileLocation);
    });
    app.get('/register', function (req, res) {
        res.sendFile(registerFileLocation);
    });
    auth_1.default(app);
    app.use('/', localAuth_1.localAuthMiddleware, staticMiddleware);
    // protect api routes
    app.all(prefix_1.default + '/*', localAuth_1.localAuthMiddleware);
    // log everything on api routes to mongo
    // app.all(API_PREFIX + '/*', apiLogging)
    // api routes
    project_1.default(app);
    client_1.default(app);
    invoice_1.default(app);
    invoice_item_1.default(app);
    timesheet_1.default(app);
    user_1.default(app);
    company_1.default(app);
    employee_1.default(app);
    app.all('*', localAuth_1.localAuthMiddleware, staticMiddleware, (req, res) => {
        res.sendFile(indexFileLocation);
    });
}
exports.default = registerRoutes;
