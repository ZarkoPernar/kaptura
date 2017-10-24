import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Modal from '../shared/modal'
import Page from '../shared/Page'
import PageSubheader from '../shared/PageSubheader'
import Pagination from '../shared/Pagination'

import LogPropType from './LogPropType'
import PageFilters from './PageFilters'
import Logs from './Logs'
import EditTimeForm from './EditTimeForm'

import createStoreListComponent from '../shared/StoreList'

import { storeItem } from './timesheetReducer'
import { storeItem as rootStoreItem } from '../timesheet/reducer'

import './sati.scss'

@connect(state => ({ company: state.companyInfo.data }))
@createStoreListComponent({
    storeName: 'timesheetList',
    actions: storeItem.actions,
    rootStoreItem,
})
export default class SatiPage extends Component {
    state = {
        timeForEdit: null,
        isEditFormGroupOpen: false,
        filters: {},
    }

    componentDidMount() {
        this.props.list()
    }

    applyFilters = (filters) => {
        this.setState({
            filters
        })
        this.props.list({
            filters,
            pages: {
                pageNumber: this.currentPage
            }
        })
    }

    onPageChange = (currentPage) => {
        console.log(currentPage);

        this.props.list({
            filters: this.state.filters,
            pages: {
                pageNumber: currentPage
            }
        })
        this.currentPage = currentPage
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
        this.props.update(log)
        this._executeAfterModalClose()
    }

    render() {
        const timeForEdit = this.state.timeForEdit === null ? undefined : this.state.timeForEdit
        return (
            <Page name="Sati" hasSubheader>
                <PageSubheader>
                    <PageFilters filters={this.state.filters} applyFilters={this.applyFilters} />
                </PageSubheader>

                <div className="page--padding">
                    <Modal isOpen={this.state.isEditModalOpen} onRequestClose={this._executeAfterModalClose}>
                        <EditTimeForm timeLog={timeForEdit} onSubmit={this.updateLog} onDismiss={this._executeAfterModalClose} />
                    </Modal>


                    <Logs onSelect={this.selectLog} logs={this.props.items} />

                    <Pagination onChange={this.onPageChange} />
                </div>
            </Page>
        )
    }
}
