const millisecond = 1,
    second = 1000 * millisecond,
    minute = 60 * second,
    hour = 60 * minute,
    day = 24 * hour,
    week = 7 * day

const microsecond = millisecond / 1000,
    nanosecond = microsecond / 1000

const unitMap = {
    "ns": nanosecond,
    "us": microsecond,
    "µs": microsecond,
    "μs": microsecond,
    "ms": millisecond,
    "s": second,
    "m": minute,
    "h": hour,
    "d": day,
    "w": week
}

class Duration {
    constructor(value) {
        if (value instanceof Duration) {
            return value
        }
        switch (typeof value) {
            case "number":
                if (!isFinite(value)) {
                    throw new Error("invalid duration: " + value)
                }
                this._milliseconds = value
                break
            case "string":
                this._milliseconds = Duration.parse(value).valueOf()
                break
            case "undefined":
                this._milliseconds = 0
                break
            default:
                throw new Error("invalid duration: " + value)
        }
    }

    nanoseconds() {
        return Math.floor(this._milliseconds / nanosecond)
    }

    microseconds() {
        return Math.floor(this._milliseconds / microsecond)
    }

    milliseconds() {
        return this._milliseconds
    }

    seconds() {
        return Math.floor(this._milliseconds / second)
    }

    minutes() {
        return Math.floor(this._milliseconds / minute)
    }

    hours() {
        return Math.floor(this._milliseconds / hour)
    }

    days() {
        return Math.floor(this._milliseconds / day)
    }

    weeks() {
        return Math.floor(this._milliseconds / week)
    }

    toParts() {
        let str = "",
            milliseconds = Math.abs(this._milliseconds),
            sign = this._milliseconds < 0 ? "-" : "";

        const parts = {
            milliseconds,
        }

        // hours
        const hours = Math.floor(parts.milliseconds / hour)
        if (hours !== 0) {
            parts.milliseconds -= hour * hours
            parts.hours = hours
        }

        // minutes
        const minutes = Math.floor(parts.milliseconds / minute)
        if (minutes !== 0) {
            parts.milliseconds -= minute * minutes
            parts.minutes = minutes
        }


        // seconds
        const seconds = Math.floor(parts.milliseconds / second)
        if (seconds !== 0) {
            parts.milliseconds -= second * seconds
            parts.seconds = seconds
        }



        return parts
    }

    toString() {
        let str = "",
            milliseconds = Math.abs(this._milliseconds),
            sign = this._milliseconds < 0 ? "-" : ""

        // no units for 0 duration
        if (milliseconds === 0) {
            return "0"
        }

        // hours
        const hours = Math.floor(milliseconds / hour)
        if (hours !== 0) {
            milliseconds -= hour * hours
            str += hours.toString() + "h"
        }

        // minutes
        const minutes = Math.floor(milliseconds / minute)
        if (minutes !== 0) {
            milliseconds -= minute * minutes
            str += minutes.toString() + "m"
        }

        // seconds
        const seconds = Math.floor(milliseconds / second)
        if (seconds !== 0) {
            milliseconds -= second * seconds
            str += seconds.toString() + "s"
        }

        return sign + str
    }

    roundTo(duration) {
        const ms = new Duration(duration).valueOf()
        this._milliseconds = ms * Math.round(this._milliseconds / ms)
    }

    isGreaterThan(duration) {
        return this.valueOf() > new Duration(duration).valueOf()
    }

    isLessThan(duration) {
        return this.valueOf() < new Duration(duration).valueOf()
    }

    isEqualTo(duration) {
        return this.valueOf() === new Duration(duration).valueOf()
    }

    after(date) {
        return new Date(date.valueOf() + this._milliseconds)
    }

}

Duration.millisecond = new Duration(millisecond)
Duration.second = new Duration(second)
Duration.minute = new Duration(minute)
Duration.hour = new Duration(hour)
Duration.day = new Duration(day)
Duration.week = new Duration(week)

Duration.milliseconds = function (milliseconds) {
    return new Duration(milliseconds * millisecond)
}

Duration.seconds = function (seconds) {
    return new Duration(seconds * second)
}

Duration.minutes = function (minutes) {
    return new Duration(minutes * minute)
}

Duration.hours = function (hours) {
    return new Duration(hours * hour)
}

Duration.days = function (days) {
    return new Duration(days * day)
}

Duration.weeks = function (weeks) {
    return new Duration(weeks * week)
}

Duration.prototype.valueOf = function () {
    return this._milliseconds
}

Duration.parse = function (duration) {

    if (duration === "0" || duration === "+0" || duration === "-0") {
        return new Duration(0)
    }

    var regex = /([\-\+\d\.]+)([a-zµμ]+)/g,
        total = 0,
        count = 0,
        sign = duration[0] === '-' ? -1 : 1,
        unit, value, match

    while (match = regex.exec(duration)) {

        unit = match[2]
        value = Math.abs(parseFloat(match[1]))
        count++

        if (isNaN(value)) {
            throw new Error("invalid duration")
        }

        if (typeof unitMap[unit] === "undefined") {
            throw new Error("invalid unit: " + unit)
        }

        total += value * unitMap[unit]
    }

    if (count === 0) {
        throw new Error("invalid duration")
    }

    return new Duration(Math.floor(total) * sign)
}

Duration.since = function (date) {
    return new Duration(new Date().valueOf() - date.valueOf())
}

Duration.until = function (date) {
    return new Duration(date.valueOf() - new Date().valueOf())
}

Duration.fromMicroseconds = function (us) {
    const ms = Math.floor(us / 1000)
    return new Duration(ms)
}

Duration.fromNanoseconds = function (ns) {
    const ms = Math.floor(ns / 1000000)
    return new Duration(ms)
}

Duration.between = function (a, b) {
    return new Duration(b.valueOf() - a.valueOf())
}

Duration.add = function (a, b) {
    return new Duration(a + b)
}

Duration.subtract = function (a, b) {
    return new Duration(a - b)
}

Duration.multiply = function (a, b) {
    return new Duration(a * b)
}

Duration.divide = function (a, b) {
    return a / b
}

Duration.abs = function (duration) {
    const ms = new Duration(duration).valueOf()
    return new Duration(Math.abs(ms))
}

export default Duration
