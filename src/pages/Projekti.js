import React, { Component } from 'react'
import MdAdd from 'react-icons/lib/md/add'
import { v4 as uid } from 'uuid'

import * as apiService from '../shared/apiService'
import ProjectList from '../projects/ProjectList'
import EditProjectForm from '../projects/edit/Form'
import DeleteProjectDialog from '../projects/edit/DeleteProjectDialog'
import { findByIdAndReplace } from '../utils/array.utils'
import projectValidator from '../projects/validator'
import Toaster from '../shared/toast/Toaster'
import Modal from '../shared/modal'
import Button from '../shared/Button'

import './projekti.scss'

const dialogStyles = {
    fontSize: '1rem',
    height: 'auto',
    marginTop: '100px',
    top: 0,
    allowRemoval: false,
}

const confirmDeleteDialogStyles = {
    ...dialogStyles,
    // width: null,
    // height: null,
    // position: null,
    // top: null,
    // left: null,
    // marginTop: null,
    // marginLeft: null,
    // background:  null,
    // border: null,
    // zIndex: null,
    // padding: null,
    // boxShadow: null,
    // fontSize: null,
    // display: null,
}

export default class ProjectPage extends Component {
    state = {
        projects: [],
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
        getProjects({
            pages: {
                pageSize: this.state.pageSize,
                pageNumber: this.state.pageNumber,
            }
        })
        .then((res) => {
            this.setState({projects: res})
        })
        .catch(console.error)
    }

    nextPage = () => {
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }), this.getProjects)
    }

    prevPage = () => {
        // if (this.state.pageNumber === 1) return
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }), this.getProjects)
    }

    submitProject = (project) => {
        if (project._id === undefined) {
            this.createProject(project)
        } else {
            this.updateProject(project)
        }
    }

    createProject = (project) => {
        this.dismiss()

        const newProject = {
            ...project,
            _id: uid(),
        }

        createProject(newProject)
            .then(() => this.getProjects())
            .catch(this.handleCreateProjectError)

        try {
            projectValidator(newProject)
            this.setState(({ projects }) => ({ projects: [newProject, ...projects]}))
        } catch(err) {
            console.error(err)
        }
    }

    removeToast = (toast) => {
        this.setState((state) => ({
            toasts: state.toasts.filter(temp => temp.id !== toast.id)
        }))
    }

    handleCreateProjectError = (err) => {
        this.setState(state => ({
            toasts: [...state.toasts, {
                description: err.message
            }]
        }))
    }

    updateProject = (project) => {
        this.dismiss()

        this.setState(({ projects }) => ({
            projects: findByIdAndReplace(projects, project),
            projectForEdit: null,
        }))

        updateProject(project)
            .then(() => this.getProjects())
    }

    _executeAfterModalClose = () => {
        this.setState({
            projectForEdit: null,
            isEditModalOpen: false,
        })
    }

    openProject = (project) => {
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

    askForRemove = (project) => {
        this.setState({
            projectForDelete: project
        })

        this.setState({
            isDeleteModalOpen: true,
        })
    }

    deleteConfirm = () => {
        this.remove()
        this.setState({
            isDeleteModalOpen: false,
        })
    }

    deleteDismiss = () => {
        this.setState({
            projectForDelete: null
        })
        this.setState({
            isDeleteModalOpen: false,
        })
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

    dismiss = () => {
        this.setState({ isEditModalOpen: false })
    }

    render() {
        const projectForEdit = this.state.projectForEdit === null ? undefined : this.state.projectForEdit

        return (
            <div className="Projekti page--padding">
                <Toaster remove={this.removeToast} toasts={this.state.toasts} />

                <Modal isOpen={this.state.isEditModalOpen} onRequestClose={this._executeAfterModalClose}>
                    <EditProjectForm
                        project={projectForEdit}
                        onSubmit={this.submitProject}
                        onDismiss={this.dismiss} />
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen}>
                    <DeleteProjectDialog
                        confirm={this.deleteConfirm}
                        dismiss={this.deleteDismiss}
                        project={this.state.projectForDelete} />
                </Modal>

                <div className="Projekti__controls">
                    <Button color="primary" onClick={this.openNew}>
                        <MdAdd />
                        Novi Projekt
                    </Button>
                </div>

                <ProjectList
                    projects={this.state.projects}
                    rowRemove={this.askForRemove}
                    rowClick={this.openProject}
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    nextPage={this.nextPage}
                    prevPage={this.prevPage} />
            </div>
        )
    }
}

function getProjects(params) {
    return apiService.post('/project/list', params)
}

function createProject(project) {
    return apiService.post('/project/create', project)
}

function updateProject(project) {
    return apiService.post('/project/update', project)
}

function removeProject(project) {
    return apiService.post('/project/remove', project)
}
