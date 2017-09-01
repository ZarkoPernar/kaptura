import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

require('./toast.scss')

import { Toast } from './Toast'

export const toastPropType = PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
})
const toastsPropTypes = PropTypes.arrayOf(toastPropType)

export default class Toaster extends Component {
    static propTypes = {
        toasts: toastsPropTypes,
    }

    static defaultProps = {
        toasts: [],
    }

    render() {
        return (
            <div key="toaster" className="toaster" hidden={!this.props.toasts.length}>
                <ul className="toast-list">
                    { this.props.toasts.map((data) => {
                        return (<Toast key={data.id || Math.random()}
                            toastData={data}
                            dismiss={this.props.remove} />
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
