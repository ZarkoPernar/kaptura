import React, { PureComponent } from 'react'

import { formatTime } from './formatTime'

class DisplayTime extends PureComponent {
    shouldComponentUpdate(nextProps) {
        return nextProps.time !== this.props.time
    }

    render() {
        return <span>{ formatTime(this.props.time) }</span>
    }
}

export default DisplayTime
