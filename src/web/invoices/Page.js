import React, { Component } from 'react'
import { v4 as uid } from 'uuid'
import MdAdd from 'react-icons/lib/md/add-circle'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Observable } from 'rxjs/Observable'

import Box from '../shared/Box'
import Toaster from '../shared/toast/Toaster'
import Sidebar from '../shared/Sidebar'
import Page from '../shared/Page'
import PageSubheader from '../shared/PageSubheader'
import PageBody from '../shared/PageBody'
import Button from '../shared/Button'

import List from './List'
import EditProjectForm from './Form'
import DeleteDialog from './DeleteDialog'
import PageFilters from './PageFilters'
import InvoiceDetail from './Detail'
import socketService from '../socket'
import createStoreListComponent from '../shared/StoreList'

import { storeItem } from './listReducer'
import { storeItem as rootStoreItem } from './reducer'

@connect(state => ({ company: state.companyInfo.data }), {
    addInvoiceAtRoot: payload => ({
        payload,
        type: rootStoreItem.types.ADD_ITEM,
    }),
    updateInvoiceAtRoot: payload => ({
        payload,
        type: rootStoreItem.types.UPDATE_ITEM_SUCCESS,
    }),
})
@createStoreListComponent({
    storeName: storeItem.name,
    actions: storeItem.actions,
    rootStoreItem,
})
export default class InvoicesPage extends Component {
    state = {
        forEdit: null,
        forDelete: null,
        isEditSidebarOpen: false,
        isDeleteSidebarOpen: false,
        pageSize: 25,
        pageNumber: 1,
    }

    componentDidMount = () => {
        this.list()

        this.create$$ = socketService.companySocket$
            .mergeMap(socket => Observable.fromEvent(socket, 'invoice_create'))
            .subscribe(this.props.addInvoiceAtRoot)

        this.update$$ = socketService.companySocket$
            .mergeMap(socket => Observable.fromEvent(socket, 'invoice_update'))
            .subscribe(this.props.updateInvoiceAtRoot)
    }

    componentWillUnmount() {
        this.create$$.unsubscribe()
        this.update$$.unsubscribe()
    }

    applyFilters = filters => {
        this.setState(
            {
                filters,
            },
            this.list,
        )
    }

    list = () => {
        this.props.list({
            filters: this.state.filters,
            pages: {
                pageSize: this.state.pageSize,
                pageNumber: this.state.pageNumber,
            },
        })
    }

    submitProject = project => {
        if (project._id === undefined) {
            this.createProject(project)
        } else {
            this.updateProject(project)
        }
    }

    createProject = project => {
        this.dismiss()

        const newProject = {
            ...project,
            _id: uid(),
        }

        this.props.add(newProject).catch(this.handleProjectError)
    }

    updateProject = project => {
        this.dismiss()

        this.setState({
            forEdit: null,
        })

        this.props.update(project).catch(this.handleProjectError)
    }

    handleProjectError = err => {
        this.setState({
            toasts: {
                description: err.message,
            },
        })
    }

    _executeAfterSidebarClose = () => {
        this.setState({
            forEdit: null,
            isEditSidebarOpen: false,
        })
    }

    openProject = project => {
        this.setState({
            forEdit: project,
            isEditSidebarOpen: true,
        })
    }

    openNew = () => {
        this.setState({
            forEdit: null,
            isEditSidebarOpen: true,
        })
    }

    askForRemove = project => {
        this.setState({
            forDelete: project,
            isDeleteSidebarOpen: true,
        })
    }

    deleteConfirm = () => {
        this.props.remove(this.state.forDelete)

        this.setState({
            isDeleteSidebarOpen: false,
        })
    }

    deleteDismiss = () => {
        this.setState({
            forDelete: null,
            isDeleteSidebarOpen: false,
        })
    }

    toggleRemoval = () => {
        this.setState(state => ({
            allowRemoval: !state.allowRemoval,
        }))
    }

    dismiss = () => {
        this.setState({ isEditSidebarOpen: false })
    }

    renderPage = () => {
        return (
            <Page name="Fakture" hasSubheader>
                <Toaster toasts={this.state.toasts} />

                <PageSubheader>
                    <PageFilters
                        filters={this.state.filters}
                        applyFilters={this.applyFilters}
                    />
                </PageSubheader>

                <PageBody>
                    {this.props.items.loading ? (
                        'Loading...'
                    ) : this.props.error ? (
                        this.props.error.toString()
                    ) : (
                        <List items={this.props.items} />
                    )}
                </PageBody>
            </Page>
        )
    }

    render() {
        const forEdit =
            this.state.forEdit === null ? undefined : this.state.forEdit

        return (
            <Box>
                <Route component={InvoiceDetail} path="/fakture/:itemId" />
                <Route render={this.renderPage} path="/fakture" exact />
            </Box>
        )
    }
}
