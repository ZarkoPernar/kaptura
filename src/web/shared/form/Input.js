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

        if (this.props.formikOnChange !== undefined) {
            this.props.formikOnChange(e)
        }
    }

    render() {
        const { formikOnChange, ...props } = this.props
        return (
            <input
                className="form-control"
                onChange={this.onChange}
                {...props}
            />
        )
    }
}

export default EnhancedInput
