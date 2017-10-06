"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const apiLog_1 = require("../models/apiLog");
function apiLogging(request, response, next) {
    const fullUrl = url.parse(request.url, true);
    const fullApi = fullUrl.path ? fullUrl.path.substring(8) : '';
    const apiUrlComponents = fullApi.split('/');
    apiLog_1.default.create({
        user: request.user,
        apiRequest: {
            method: request.method,
            payload: request.body,
            full_url: fullUrl.path,
            api: apiUrlComponents[0],
            api_action: apiUrlComponents[1],
        }
    })
        .then(console.log)
        .catch(console.log);
    next();
}
exports.default = apiLogging;
