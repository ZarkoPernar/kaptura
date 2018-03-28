import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import { Toast } from './Toast'
import './toast.scss'

export const toastPropType = PropTypes.shape({
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
})
const toastsPropTypes = PropTypes.arrayOf(toastPropType)

export default class Toaster extends Component {
    static propTypes = {
        toasts: toastsPropTypes,
    }

    static defaultProps = {
        toasts: [],
    }

    state = {
        toasts: [],
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toasts !== this.props.toasts) {
            const nextToasts = (Array.isArray(nextProps.toasts)
                ? nextProps.toasts
                : [nextProps.toasts]
            ).map(toast => {
                if (!toast.id) {
                    return {
                        ...toast,
                        id: v4(),
                    }
                }

                return toast
            })
            this.setState(({ toasts }) => ({
                toasts: [...toasts, ...nextToasts],
            }))
        }
    }

    removeToast = toast => {
        this.setState(state => ({
            toasts: state.toasts.filter(temp => temp.id !== toast.id),
        }))
    }

    render() {
        return (
            <div
                key="toaster"
                className="toaster"
                hidden={!this.state.toasts.length}
            >
                <ul className="toast-list">
                    {this.state.toasts.map(data => {
                        return (
                            <Toast
                                key={data.id}
                                toastData={data}
                                dismiss={this.removeToast}
                            />
                        )
                    })}
                </ul>
            </div>
        )
    }
}
