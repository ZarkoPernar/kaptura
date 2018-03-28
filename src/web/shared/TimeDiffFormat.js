import React from 'react'
import * as moment from 'moment'

import { formatTime, diff } from '../clock/formatTime'

const MINUTE_MS = 60 * 60 * 1000
const getTimeDiff = (start, stop) => (stop && start ? diff(stop, start) : 0)
const formatTimeDiff = ms => (ms === 0 ? '' : (ms / MINUTE_MS).toFixed(2))

export default function TimeDiffFormat({ start, stop }) {
    const diffInMs = getTimeDiff(start, stop)
    const hours = formatTimeDiff(diffInMs)

    return <time>{hours}</time>
}
