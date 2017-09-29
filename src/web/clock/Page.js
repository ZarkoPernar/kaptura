import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateLog } from '../clock/reducer'
import Logs from '../clock/Logs'
import * as api from '../clock/api'
import EditTimeForm from '../clock/EditTimeForm'
import { selector } from '../clock/reducer'
import Modal from '../shared/modal'
import Page from '../shared/Page'
import PageSubheader from '../shared/PageSubheader'

import PageFilters from './PageFilters'

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
        isEditFormGroupOpen: false,
        logs: [],
    }

    applyFilters(filters) {
        api.list({
            filters,
        })
        .then((res) => {
            this.setState({
                logs: res
            })
        })
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
            <Page name="Sati">
                <PageSubheader>
                    <PageFilters applyFilters={this.applyFilters} />
                </PageSubheader>

                <div className="page--padding">
                    <Modal isOpen={this.state.isEditModalOpen} onRequestClose={this._executeAfterModalClose}>
                        <EditTimeForm timeLog={timeForEdit} onSubmit={this.updateLog} onDismiss={this._executeAfterModalClose} />
                    </Modal>


                    <Logs onSelect={this.selectLog} logs={this.state.logs.length ? this.state.logs : this.props.logs} />
                </div>
            </Page>
        )
    }
}

const StoreSatiPage = connect(mapStateToProps, mapDispatchToProps)(SatiPage)

export default StoreSatiPage
