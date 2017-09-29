import React, { Component } from 'react'
import { v4 as uid } from 'uuid'
import MdAdd from 'react-icons/lib/md/add-circle'

import Toaster from '../shared/toast/Toaster'
import Modal from '../shared/modal'
import Calendar from '../shared/calendar'
import Page from '../shared/Page'
import PageSubheader from '../shared/PageSubheader'
import PageBody from '../shared/PageBody'
import Button from '../shared/Button'

import ProjectList from './ProjectList'
import EditProjectForm from './Form'
import DeleteProjectDialog from './DeleteProjectDialog'
import PageFilters from './PageFilters'
import ProjectTabs from './ProjectTabs'

import * as api from './api'

import CreateStoreItemComponent from '../shared/StoreList'

import { storeItem } from './reducer'

import './projekti.scss'

@CreateStoreItemComponent({
    storeName: 'projects',
    actions: storeItem.actions
})
export default class ProjectPage extends Component {
    state = {
        projectForEdit: null,
        projectForDelete: null,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        pageSize: 25,
        pageNumber: 1,
        activeTab: 'List',
        clientName: '',
        projects: [],
    }

    componentWillMount = () => {
        this.getProjects()
    }

    applyFilters = (filters) => {
        api.list({
            filters,
        })
        .then((res) => {
            this.setState({
                projects: res
            })
        })
    }

    selectTab = (activeTab) => {
        this.setState({
            activeTab,
        })
    }

    getProjects = () => {
        this.props.list({
            pages: {
                pageSize: this.state.pageSize,
                pageNumber: this.state.pageNumber,
            }
        })
    }

    nextPage = () => {
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }), this.getProjects)
    }

    prevPage = () => {
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

        this.props.add(newProject)
            .catch(this.handleProjectError)

    }

    updateProject = (project) => {
        this.dismiss()

        this.setState({
            projectForEdit: null,
        })

        this.props.update(project)
            .catch(this.handleProjectError)
    }



    handleProjectError = (err) => {
        this.setState({
            toasts: {
                description: err.message
            }
        })
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
            allowRemoval: !state.allowRemoval
        }))
    }

    dismiss = () => {
        this.setState({ isEditModalOpen: false })
    }

    renderCalendar = (projects) => (
        <Calendar items={projects} onEventChange={this.submitProject} />
    )

    renderList = (projects) =>  (
        <ProjectList
            projects={projects}
            rowRemove={this.askForRemove}
            rowClick={this.openProject}
            pageNumber={this.state.pageNumber}
            pageSize={this.state.pageSize}
            nextPage={this.nextPage}
            prevPage={this.prevPage} />
    )


    render() {
        const projectForEdit = this.state.projectForEdit === null ? undefined : this.state.projectForEdit
        const projects = this.state.projects.length ? this.state.projects : this.props.items
        const renderFn = this['render' + this.state.activeTab]
        const renderContent = renderFn(projects)

        return (
            <Page name="Projekti">
                <PageSubheader>
                    <ProjectTabs activeTab={this.state.activeTab} selectTab={this.selectTab} />

                    <PageFilters applyFilters={this.applyFilters} />

                    <Button flat color="primary" onClick={this.openNew}>
                        <MdAdd />
                        Novi Projekt
                    </Button>
                </PageSubheader>


                <PageBody>
                    <Toaster toasts={this.state.toasts} />

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

                    { renderContent }
                </PageBody>
            </Page>
        )
    }
}
