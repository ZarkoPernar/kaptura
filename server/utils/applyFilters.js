"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators = {
    '=': 'equals',
    '<': 'lt',
    '>': 'gt',
    '<=': 'lte',
    '>=': 'gte',
};
function applyFilters(params, query) {
    if (params.filters) {
        Object.entries(params.filters).forEach(yo, query);
    }
    return query;
}
exports.default = applyFilters;
function yo([key, { comparator, value }]) {
    // "this" is a query object
    const queryMethodName = operators[comparator];
    if (queryMethodName === undefined)
        return;
    this.where(key)[queryMethodName].call(this, value);
}
