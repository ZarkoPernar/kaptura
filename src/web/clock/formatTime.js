import Duration from './Duration'

export function formatTime(dateStr) {
    if (!dateStr) return ''

    const date = new Date(Date.parse(dateStr))

    return frm(date.getHours(), true) +
        ':' +
        frm(date.getMinutes()) +
        ':' +
        frm(date.getSeconds())
}

export function timeSinceNow(first) {
    return formatDiff(
        new Date().toISOString(),
        first
    )
}

export function timeSince(last, first) {
    return formatDiff(
        last,
        first
    )
}

export function formatDiff(last, first) {
    if (!last || !first) return ''

    const duration = new Duration(diff(last, first))
    const { hours, minutes, seconds } = duration.toParts()

    return `${(hours === undefined ? '0' : hours)}:${formatPart(minutes)}:${formatPart(seconds)}`
}

function formatPart(val) {
    if (val === undefined) return '00'

    if (val < 10) return '0' + val

    return val.toString()
}

export function diff(last, first) {
    return new Date(Date.parse(last)) - new Date(Date.parse(first))
}

function frm(num) {
    const val = Math.floor(num)

    if (val < 10) return formatLow(val)
    else if (val > 59) return formatHigh(val)

    return val
}


function formatLow(val) {
    return '0' + val
}

function formatHigh(val) {
    const higherAmount = Math.floor(val / 60)
    const remain = val - Math.round(higherAmount * 60)

    if (val < 10) return formatLow(remain)

    return remain
}

