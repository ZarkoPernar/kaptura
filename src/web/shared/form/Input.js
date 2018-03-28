import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EnhancedInput extends Component {
    // static propTypes = {
    //     onChange
    // }
    onChange = e => {
        if (this.props.onChange !== undefined) {
            this.props.onChange(e.target.value, this.props.name, e)
        }
    }

    render() {
        const { formikOnChange, ...props } = this.props
        return (
            <input
                className="form-control"
                {...props}
                onChange={this.onChange}
            />
        )
    }
}

export default EnhancedInput
