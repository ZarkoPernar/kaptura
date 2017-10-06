"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncWrap(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
exports.asyncWrap = asyncWrap;
