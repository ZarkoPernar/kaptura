import React, { Component } from 'react'
import SkyLight from 'react-skylight'
import { MdAdd, MdDelete } from 'react-icons/lib/md'

import http from '../shared/httpService'
import ProjectList from '../projects/list/ProjectList'
import EditProjectForm from '../projects/edit/Form'
import DeleteProjectDialog from '../projects/edit/DeleteProjectDialog'
import updateById from '../utils/updateById'
import projectValidator from '../projects/validator'
import Toaster from '../shared/toast/Toaster'

import './projekti.scss'

const dialogStyles = {
    fontSize: '1rem',
    height: 'auto',
    marginTop: '100px',
    top: 0,
    allowRemoval: false,
}

const confirmDeleteDialogStyles = Object.assign({}, dialogStyles, {

})

export default class C extends Component {
    state = {
        projects: [],
        toasts: [],
        projectForEdit: null,
        projectForDelete: null,
        isModalOpen: false,
    }

    componentWillMount = () => {
        this.getProjects()
    }

    getProjects = () => {
        getProjects().then((res) => {
            this.setState({projects: res})
        })
    }

    createProject = (project) => {
        this.modal.hide()

        createProject(project)
            .then(() => this.getProjects())
            .catch(this.handleCreateProjectError)

        try {
            projectValidator(project)
            this.setState(({ projects }) => ({ projects: [project, ...projects]}))
        } catch(err) {
            // console.error(err)
        }
    }

    removeToast = (toast) => {
        this.setState((state) => ({
            toasts: state.toasts.filter(temp => temp.id !== toast.id)
        }))
    }

    handleCreateProjectError = (err) => {
        console.log(err)
        this.setState(state => ({
            toasts: [...state.toasts, {
                description: err.message
            }]
        }))
    }

    updateProject = (project) => {
        this.modal.hide()

        this.setState(({ projects }) => ({
            projects: updateById(project, projects),
            projectForEdit: null,
        }))

        updateProject(project)
            .then(() => this.getProjects())
    }

    _executeAfterModalClose = () => {
        this.setState({
            projectForEdit: null
        })
    }

    openProject = (project) => {
        this.setState({
            projectForEdit: project
        })
        this.openModal()
    }

    openNew = () => {
        this.setState({
            projectForEdit: null,
        })
        this.openModal()
    }

    askForRemove = (project) => {
        this.setState({
            projectForDelete: project
        })
        this.deleteModalRef.show()
    }

    deleteConfirm = () => {
        this.remove()
        this.deleteModalRef.hide()
    }

    deleteDismiss = () => {
        this.setState({
            projectForDelete: null
        })
        this.deleteModalRef.hide()
    }

    remove = () => {
        removeProject(this.state.projectForDelete)
            .then(() => {
                this.setState(({projects, projectForDelete}) => {
                    return {
                        projects: projects.filter(pr => pr._id !== projectForDelete._id),
                        projectForDelete: null,
                    }
                })
            })
    }

    toggleRemoval = () => {
        this.setState(state => ({
            allowRemoval: !state.allowRemoval
        }))
    }

    openModal = () => {
        this.modal.show()
    }

    dismiss = () => {
        this.modal.hide()
    }

    getDeleteModalRef = (el) => {
        this.deleteModalRef = el
    }

    render() {
        return (
            <div className="Projekti">
                <Toaster key="toaster" remove={this.removeToast} toasts={this.state.toasts} />
                <SkyLight dialogStyles={dialogStyles} hideOnOverlayClicked afterClose={this._executeAfterModalClose} ref={el => { this.modal = el }} key="modal">
                    {(
                        this.state.projectForEdit ?
                        <EditProjectForm project={this.state.projectForEdit} onSubmit={this.updateProject} onDismiss={this.dismiss} /> :
                        <EditProjectForm onSubmit={this.createProject} onDismiss={this.dismiss} />
                    )}
                </SkyLight>

                <SkyLight dialogStyles={confirmDeleteDialogStyles}
                    hideOnOverlayClicked
                    ref={this.getDeleteModalRef} key="delete-modal">

                    <DeleteProjectDialog
                        confirm={this.deleteConfirm}
                        dismiss={this.deleteDismiss}
                        project={this.state.projectForDelete} />
                </SkyLight>

                <div className="Projekti__controls" key="controls">
                    <button className="btn btn--primary" onClick={this.openNew}>
                        <MdAdd />
                        Novi Projekt
                    </button>
                </div>

                <ProjectList
                    projects={this.state.projects}
                    activeProject={this.state.projectForEdit}
                    key="table"
                    rowRemove={this.askForRemove}
                    rowClick={this.openProject} />
            </div>
        )
    }
}

function getProjects() {
    return fetch('/api/v1/project/list')
        .then(res => res.json())
}

function createProject(project) {
    return http.post('/project/create', project)
}

function updateProject(project) {
    return http.post('/project/update', project)
}

function removeProject(project) {
    return http.post('/project/remove', project)
}
