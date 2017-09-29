import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimePicker from 'rc-time-picker'
import * as moment from 'moment'

import 'rc-time-picker/assets/index.css'

const TIME_FORMAT = 'HH:mm'

class Timepicker extends Component {

    timeChange = (val) => {
        this.props.onChange(
            val,
            this.props.name
        )
    }

    render() {
        const value = this.props.value ? moment(this.props.value) : null

        return (
            <TimePicker
                {...this.props}
                value={value}
                showSecond={false}
                onChange={this.timeChange}
                format={TIME_FORMAT}
            />
        )
    }
}

Timepicker.propTypes = {

}

export default Timepicker
