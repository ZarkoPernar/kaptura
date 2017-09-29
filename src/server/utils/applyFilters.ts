const operators = {
    '=': 'equals',
    '<': 'lt',
    '>': 'gt',
    '<=': 'lte',
    '>=': 'gte',
}

export default function applyFilters(params, query) {
    if (params.filters) {
        Object.entries(params.filters).forEach(yo, query)
    }

    return query
}

function yo([key, { comparator, value }]) {
    // "this" is a query object
    const queryMethodName = operators[comparator]

    if (queryMethodName === undefined) return

    this.where(key)[queryMethodName].call(this, value)
}
