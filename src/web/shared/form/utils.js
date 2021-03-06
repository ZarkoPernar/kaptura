import * as moment from 'moment'

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const OBJECT_TYPE = '[object Object]'

const TEXT_INPUT_TYPE = 'text'
const DATE_INPUT_TYPE = 'date'
const TIME_INPUT_TYPE = 'time'

export function hasValue(value) {
    switch(typeof value) {
        case STRING_TYPE:
            return value.length > 0
        case NUMBER_TYPE:
            return true
        default:
            return !!value
    }
}

export function formatValueForInput(value, type) {
    if (type === undefined) {
        throw new Error('Second argument "type" is required')
    }

    switch(type) {
        case TEXT_INPUT_TYPE:
            return value
        case NUMBER_TYPE:
            return value
        case DATE_INPUT_TYPE:
            return value === undefined ? value : moment(value)
        case TIME_INPUT_TYPE:
            return value === undefined ? value : moment(value)
        default:
            return value
    }
}

export function getKeyValuesInForm(formElement) {
    const elements = Array.from(formElement.elements)
    return elements
        .filter(el => (el && el.name && el.value))
        .reduce((obj, el) => {
            obj[el.name] = el.value
            return obj
        }, {})
}

function formatAsISOString(moment) {
    // Fake
    // return moment.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    return moment.toISOString()
}
