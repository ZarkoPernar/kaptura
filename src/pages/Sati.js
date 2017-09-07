import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateLog } from '../clock/reducer'
import Logs from '../clock/Logs'
import EditTimeForm from '../clock/EditTimeForm'
import { selector } from '../clock/reducer'
import Modal from '../shared/modal'

import './sati.scss'


const mapStateToProps = state => {
    return {
        logs: selector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLog: (log) => dispatch(updateLog(log)),
    }
}

class SatiPage extends Component {
    state = {
        timeForEdit: null,
        isEditModalOpen: false,
    }

    selectLog = (log) => {
        this.setState({
            timeForEdit: log,
            isEditModalOpen: true,
        })
    }

    _executeAfterModalClose = () => {
        if (!this.state.isEditModalOpen) return

        this.setState({
            timeForEdit: null,
            isEditModalOpen: false,
        })
    }

    // TODO:
    updateLog = (log) => {
        this.props.updateLog(log)
        this._executeAfterModalClose()
    }

    render() {
        const timeForEdit = this.state.timeForEdit === null ? undefined : this.state.timeForEdit
        return (
            <div className="Sati page--padding">
                <Modal isOpen={this.state.isEditModalOpen} onRequestClose={this._executeAfterModalClose}>
                    <EditTimeForm timeLog={timeForEdit} onSubmit={this.updateLog} onDismiss={this._executeAfterModalClose} />
                </Modal>

                <Logs onSelect={this.selectLog} logs={this.props.logs} />
            </div>
        )
    }
}

const StoreSatiPage = connect(mapStateToProps, mapDispatchToProps)(SatiPage)

export default StoreSatiPage
