import React, { Component } from 'react'
import format from 'date-fns/format'

const STR = 'string'

export default class DisplayDate extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.children !== this.props.children
    }

    render() {
        return typeof this.props.children !== STR ? '' : format(this.props.children, 'DD/MM/YYYY')
    }
}
