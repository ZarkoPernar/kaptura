"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../api/company");
const utils_1 = require("./utils");
const prefix_1 = require("./prefix");
const ROUTE_PREFIX = prefix_1.default + '/company';
function registerRoutes(app) {
    // app.get(ROUTE_PREFIX + '/getItem', asyncWrap(api.getItem))
    // app.post(ROUTE_PREFIX + '/list', asyncWrap(api.list))
    // app.post(ROUTE_PREFIX + '/create', asyncWrap(api.create))
    app.post(ROUTE_PREFIX + '/update', utils_1.asyncWrap(api.update));
    // app.post(ROUTE_PREFIX + '/remove', asyncWrap(api.remove))
}
exports.default = registerRoutes;
