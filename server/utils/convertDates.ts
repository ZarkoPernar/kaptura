const STR_TYPE = 'string'

export default function convertDates(obj: any, names: string[]): any {
    return names.reduce(convert, obj)
}

function convert(obj, name) {
    if (isString(obj[name])) {
        obj[name] = covertStrToDate(obj[name])
    }
    return obj
}

function covertStrToDate(date: string): Date {
    return new Date(date)
}

function isString(val): boolean {
    return typeof val === STR_TYPE
}

