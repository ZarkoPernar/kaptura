"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("../api/user");
const utils_1 = require("./utils");
const prefix_1 = require("./prefix");
const ROUTE_PREFIX = prefix_1.default + '/user';
function registerRoutes(app) {
    app.get(ROUTE_PREFIX + '/userInfo', utils_1.asyncWrap(api.userInfo));
    app.post(ROUTE_PREFIX + '/update', utils_1.asyncWrap(api.update));
}
exports.default = registerRoutes;
