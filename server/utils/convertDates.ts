const STR_TYPE = 'string'

export default function convertDates(obj: any) {
    if (isString(obj.start_date)) {
        obj.start_date = covertStrToDate(obj.start_date)
    }

    if (isString(obj.end_date)) {
        obj.end_date = covertStrToDate(obj.end_date)
    }
}

function covertStrToDate(date: string): Date {
    return new Date(date)
}

function isString(val): boolean {
    return typeof val === STR_TYPE
}
