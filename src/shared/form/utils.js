import moment from 'moment'

const STRING_TYPE = 'string'
const NUMBER_TYPE = 'number'
const OBJECT_TYPE = 'object'

const TEXT_INPUT_TYPE = 'text'
const DATE_INPUT_TYPE = 'date'

export function hasValue(value) {
    switch(typeof value) {
        case STRING_TYPE:
            return !!value
        case NUMBER_TYPE:
            return true
        default:
            return !!value
    }
}

export function formatValueForCallback(value) {
    switch(typeof value) {
        case STRING_TYPE:
            return value
        case NUMBER_TYPE:
            return value
        case OBJECT_TYPE:
            if (moment.isMoment(value)) {
                return formatAsISOString(value)
            }
            return value
        default:
            return value
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
            return moment(value)
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
