import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toastPropType } from './Toaster'

export class Toast extends Component {
    static propTypes = {
        toastData: toastPropType,
        removeMe: PropTypes.func,
        dismiss: PropTypes.func,
    }

    state = {
        closed: false,
    }

    componentDidMount() {
        if (this.props.toastData.duration) {
            setTimeout(this._timeOut, this.props.toastData.duration)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.toastData !== this.props.toastData ||
            nextState.closed !== this.state.closed
        )
    }

    _dismiss = () => {
        this.props.dismiss(this.props.toastData)
    }

    _timeOut = () => {
        this.setState({
            closed: true,
        })

        this.props.removeMe()
    }

    render() {
        return (
            <li
                onClick={this._dismiss}
                className={
                    'toast ' +
                    (this.props.toastData.closed || this.state.closed
                        ? 'toast--closed'
                        : '')
                }
            >
                {this.props.toastData.message}
            </li>
        )
    }
}
