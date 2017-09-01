
export const getLast = arr => arr[arr.length - 1]


export function checkIn(log) {
    return addTime('check_in', log)
}

export function checkOut(log) {
    return addTime('check_out', log)
}

export function inOut(log) {
    if (!log || !log.check_in) return checkIn()

    if (!log.check_out) return checkOut(log)

    // TODO: review this behavior
    return log
}

export function isUnfinished(logOrLogs) {
    if (Array.isArray(logOrLogs)) {
        return isLogUnfinished(getLast(logOrLogs))
    }

    return isLogUnfinished(logOrLogs)
}

export function isValidDate(d) {
    // is it a date obj
    if (Object.prototype.toString.call(d) !== "[object Date]") return false

    // is it a date obj with valid time
    if (Number.isNaN(d.getTime())) return false

    return true
}

function addTime(name, log={}) {
    return {
        ...log,
        [name]: getTime(),
    }
}

export function getTime(date=new Date()) {
    return date
}


function isLogUnfinished(log) {
    return Boolean(log && log.check_in && !log.check_out)
}

const MS = 1000
export function getDurationInSeconds(log) {
    return Math.round(getDuration(log) / MS)
}

export function getDuration(log) {
    if (log === undefined || !log.check_in || !log.check_out) return 0

    const checkInDate = parse(log.check_in)
    const checkOutDate = parse(log.check_out)

    return Math.round(checkOutDate - checkInDate)
}

function parse(str) {
    return new Date(Date.parse(str))
}
