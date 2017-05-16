import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ENTER_KEY = 13

class TextareaComponent extends Component {
    static propTypes = {
        name: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        rows: PropTypes.number,
    }

    static defaultProps = {
        rows: 3
    }

    constructor(props) {
        super(props)

        this.state = {
            rows: this.props.rows
        }
    }

    onKeyDown = (event) => {
        if (event.keyCode === ENTER_KEY) {
            // event.preventDefault()
            // event.stopPropagation()
            this.setState((state) => {
                return {
                    rows: state.rows + 1
                }
            })
        }
    }

    render() {
        return (
            <textarea {...this.props} onKeyDown={this.onKeyDown} rows={this.state.rows} />
        )
    }
}

export default TextareaComponent
