import React, { Component } from 'react'

import { formatTime } from './formatTime'

class DisplayTime extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.time !== this.props.time
    }

    render() {
        return formatTime(this.props.time)
    }
}

export default DisplayTime
