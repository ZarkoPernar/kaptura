import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EnhancedInput extends Component {
    onChange = (e) => {
        this.props.onChange(e.target.value, this.props.name)
    }

    render() {
        return (
            <input className="form-control" {...this.props} onChange={this.onChange} />
        )
    }
}

EnhancedInput.propTypes = {

}

export default EnhancedInput
