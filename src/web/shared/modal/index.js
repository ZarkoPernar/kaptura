import React, { Component } from 'react'
import ReactModal from 'react-modal'

import './modal.scss'
const TIMEOUT_MS = 300

class Modal extends Component {
    render() {
        return (
            <ReactModal
                contentLabel="Modal"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
                shouldCloseOnOverlayClick
                closeTimeoutMS={TIMEOUT_MS}
                {...this.props}>
                { this.props.children }
            </ReactModal>
        )
    }
}

export default Modal
