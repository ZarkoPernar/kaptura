import React from 'react'
import * as moment from 'moment'

import { formatDiff } from '../clock/formatTime'

export default function TimeDurationFormat({ start, stop }) {
    return <time>{formatDiff(start, stop)}</time>
}
