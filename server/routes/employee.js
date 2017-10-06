"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../api/employee");
const utils_1 = require("./utils");
const prefix_1 = require("./prefix");
const ROUTE_PREFIX = prefix_1.default + '/employee';
function registerRoutes(app) {
    app.get(ROUTE_PREFIX + '/getItem', utils_1.asyncWrap(api.getItem));
    app.post(ROUTE_PREFIX + '/list', utils_1.asyncWrap(api.list));
    app.post(ROUTE_PREFIX + '/create', utils_1.asyncWrap(api.create));
    app.post(ROUTE_PREFIX + '/update', utils_1.asyncWrap(api.update));
    app.post(ROUTE_PREFIX + '/remove', utils_1.asyncWrap(api.remove));
}
exports.default = registerRoutes;
