import React, { Component } from 'react'
import MdAdd from 'react-icons/lib/md/add'
import { v4 as uid } from 'uuid'

import ClientList from './List'
import EditClientForm from './Form'
import DeleteDialog from './DeleteDialog'
import Toaster from '../shared/toast/Toaster'
import Sidebar from '../shared/Sidebar'
import Button from '../shared/Button'
import createStoreListComponent from '../shared/StoreList'

import { storeItem } from './reducer'

@createStoreListComponent({
    storeName: 'clients',
    actions: storeItem.actions,
})
export default class ClientsPage extends Component {
    state = {
        toasts: [],
        projectForEdit: null,
        projectForDelete: null,
        isEditSidebarOpen: false,
        isDeleteSidebarOpen: false,
        pageSize: 25,
        pageNumber: 1,
    }

    componentDidMount = () => {
        this.getProjects()
    }

    getProjects = () => {
        this.props.list({
            pages: {
                pageSize: this.state.pageSize,
                pageNumber: this.state.pageNumber,
            },
        })
    }

    nextPage = () => {
        this.setState(
            state => ({ pageNumber: state.pageNumber + 1 }),
            this.getProjects,
        )
    }

    prevPage = () => {
        this.setState(
            state => ({ pageNumber: state.pageNumber - 1 }),
            this.getProjects,
        )
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
            projectForEdit: null,
        })

        this.props.update(project).catch(this.handleProjectError)
    }

    removeToast = toast => {
        this.setState(state => ({
            toasts: state.toasts.filter(temp => temp.id !== toast.id),
        }))
    }

    handleProjectError = err => {
        this.setState(state => ({
            toasts: [
                ...state.toasts,
                {
                    description: err.message,
                },
            ],
        }))
    }

    _executeAfterSidebarClose = () => {
        this.setState({
            projectForEdit: null,
            isEditSidebarOpen: false,
        })
    }

    openProject = project => {
        this.setState({
            projectForEdit: project,
            isEditSidebarOpen: true,
        })
    }

    openNew = () => {
        this.setState({
            projectForEdit: null,
            isEditSidebarOpen: true,
        })
    }

    askForRemove = project => {
        this.setState({
            projectForDelete: project,
            isDeleteSidebarOpen: true,
        })
    }

    deleteConfirm = () => {
        this.props.remove(this.state.projectForDelete)

        this.setState({
            isDeleteSidebarOpen: false,
        })
    }

    deleteDismiss = () => {
        this.setState({
            projectForDelete: null,
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

    render() {
        const projectForEdit =
            this.state.projectForEdit === null
                ? undefined
                : this.state.projectForEdit

        return (
            <div className="Klijenti page--padding">
                <Toaster remove={this.removeToast} toasts={this.state.toasts} />

                <Sidebar
                    isOpen={this.state.isEditSidebarOpen}
                    onRequestClose={this._executeAfterSidebarClose}
                >
                    <EditClientForm
                        client={projectForEdit}
                        onSubmit={this.submitProject}
                        onDismiss={this.dismiss}
                    />
                </Sidebar>

                <Sidebar isOpen={this.state.isDeleteSidebarOpen}>
                    <DeleteDialog
                        confirm={this.deleteConfirm}
                        dismiss={this.deleteDismiss}
                        project={this.state.projectForDelete}
                    />
                </Sidebar>

                <div className="page__controls">
                    <Button color="primary" onClick={this.openNew}>
                        Novi Klijent
                    </Button>
                </div>

                <ClientList
                    projects={this.props.items}
                    rowRemove={this.askForRemove}
                    rowClick={this.openProject}
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    nextPage={this.nextPage}
                    prevPage={this.prevPage}
                />
            </div>
        )
    }
}
