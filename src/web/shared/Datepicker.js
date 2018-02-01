import React, { Component } from 'react'
import * as moment from 'moment'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import 'react-datepicker/dist/react-datepicker.css'

const DATE_SHORT_FORMAT = 'DD.MM.YYYY'

function getValueFromProps(isoString) {
    if (!isoString) return null //moment()

    return moment(isoString)
}

function getValueFromInput(shortDate) {
    return moment(shortDate, DATE_SHORT_FORMAT)
}

function formatValueForCallback(moment) {
    if (!moment) return moment

    return moment.toISOString()
}

class Datepicker extends Component {
    state = {}

    dateChange = moment => {
        this.props.onChange(formatValueForCallback(moment), this.props.name)
    }

    render() {
        const { value, ...filteredProps } = this.props
        const selected = getValueFromProps(value)

        return (
            <DatePicker
                {...filteredProps}
                dateFormat={DATE_SHORT_FORMAT}
                onChangeRaw={this.onChangeRaw}
                onChange={this.dateChange}
                className={classnames('form-control', this.props.className)}
                selected={selected}
            />
        )
    }
}

export default Datepicker
