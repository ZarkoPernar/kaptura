import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

require('./toast.scss')

import { Toast } from './Toast'

export const toastPropType = PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string.isRequired, PropTypes.number]),
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
        toasts: []
    }

    constructor(props) {
        super(props)
        // const nextToasts = Array.isArray(props.toasts) ? props.toasts : [props.toasts]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toasts !== this.props.toasts) {
            const nextToasts = Array.isArray(nextProps.toasts) ? nextProps.toasts : [nextProps.toasts]
            this.setState(({ toasts }) => ({
                toasts: [...toasts, ...nextToasts]
            }))
        }
    }

    removeToast = (toast) => {
        this.setState((state) => ({
            toasts: state.toasts.filter(temp => temp.id !== toast.id)
        }))
    }

    render() {
        return (
            <div key="toaster" className="toaster" hidden={!this.props.toasts.length}>
                <ul className="toast-list">
                    { this.state.toasts.map((data) => {
                        return (<Toast key={data.id || Math.random()}
                            toastData={data}
                            dismiss={this.removeToast} />
                        )
                    }) }
                </ul>
            </div>
        )
    }
}

// const LinkedToaster = connect(mapStateToProps, mapDispatchToProps)(Toaster)

// export default LinkedToaster

// function mapStateToProps({toasts}) {
//     return {
//         toasts,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         removeToast(toast) {
//             dispatch({
//                 type: 'REMOVE_TOAST',
//                 payload: toast
//             })
//         },
//         dismissToast(toast) {
//             dispatch({
//                 type: 'DISMISS_TOAST',
//                 payload: toast
//             })
//         }
//     }
// }
