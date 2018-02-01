import React, { Component } from 'react'
import MdAdd from 'react-icons/lib/md/add'
import { v4 as uid } from 'uuid'

import ClientList from './List'
import EditClientForm from './Form'
import DeleteDialog from './DeleteDialog'
import Toaster from '../shared/toast/Toaster'
import Modal from '../shared/modal'
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
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        pageSize: 25,
        pageNumber: 1,
    }

    componentWillMount = () => {
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

    _executeAfterModalClose = () => {
        this.setState({
            projectForEdit: null,
            isEditModalOpen: false,
        })
    }

    openProject = project => {
        this.setState({
            projectForEdit: project,
            isEditModalOpen: true,
        })
    }

    openNew = () => {
        this.setState({
            projectForEdit: null,
            isEditModalOpen: true,
        })
    }

    askForRemove = project => {
        this.setState({
            projectForDelete: project,
            isDeleteModalOpen: true,
        })
    }

    deleteConfirm = () => {
        this.props.remove(this.state.projectForDelete)

        this.setState({
            isDeleteModalOpen: false,
        })
    }

    deleteDismiss = () => {
        this.setState({
            projectForDelete: null,
            isDeleteModalOpen: false,
        })
    }

    toggleRemoval = () => {
        this.setState(state => ({
            allowRemoval: !state.allowRemoval,
        }))
    }

    dismiss = () => {
        this.setState({ isEditModalOpen: false })
    }

    render() {
        const projectForEdit =
            this.state.projectForEdit === null
                ? undefined
                : this.state.projectForEdit

        return (
            <div className="Klijenti page--padding">
                <Toaster remove={this.removeToast} toasts={this.state.toasts} />

                <Modal
                    isOpen={this.state.isEditModalOpen}
                    onRequestClose={this._executeAfterModalClose}
                >
                    <EditClientForm
                        client={projectForEdit}
                        onSubmit={this.submitProject}
                        onDismiss={this.dismiss}
                    />
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen}>
                    <DeleteDialog
                        confirm={this.deleteConfirm}
                        dismiss={this.deleteDismiss}
                        project={this.state.projectForDelete}
                    />
                </Modal>

                <div className="page__controls">
                    <Button color="primary" onClick={this.openNew}>
                        <MdAdd />
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
