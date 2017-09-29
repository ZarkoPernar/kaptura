import React from 'react'
import * as moment from 'moment'

export default function TimeFormat({ children }) {
    return <time>{children ? moment(children).format('DD.MM.YYYY') : ''}</time>
}
