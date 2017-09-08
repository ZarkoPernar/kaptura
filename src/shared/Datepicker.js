import React, { Component } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'

const DATE_SHORT_FORMAT = 'DD.MM.YYYY'

function getValueFromProps(isoString) {
    if (!moment) return moment()

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

    dateChange = (moment) => {
        this.props.onChange(
            formatValueForCallback(moment),
            this.props.name
        )
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
                className="form-control"
                selected={selected} />
        )
    }
}

export default Datepicker
