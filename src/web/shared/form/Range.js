import React, { Component } from 'react'

class Range extends Component {
    static defaultProps = {
        value: 0
    }

    onChange = (e) => {
        this.props.onChange(parseFloat(e.target.value), this.props.name)
    }

    render() {
        return (
            <input type="range" onChange={this.onChange} value={this.props.value} />
        )
    }
}

export default Range
