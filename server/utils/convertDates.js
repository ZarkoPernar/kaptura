"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const STR_TYPE = 'string';
function convertDates(obj, names) {
    return names.reduce(convert, obj);
}
exports.default = convertDates;
function convert(obj, name) {
    if (isString(obj[name])) {
        obj[name] = covertStrToDate(obj[name]);
    }
    return obj;
}
function covertStrToDate(date) {
    return new Date(date);
}
function isString(val) {
    return typeof val === STR_TYPE;
}
