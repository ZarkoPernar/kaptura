import React, { Component } from 'react'
import { v4 as uid } from 'uuid'
import MdAdd from 'react-icons/lib/md/add-circle'
import { connect } from 'react-redux'

import Toaster from '../shared/toast/Toaster'
import Modal from '../shared/modal'
import Calendar from '../shared/calendar'
import Page from '../shared/Page'
import PageSubheader from '../shared/PageSubheader'
import PageBody from '../shared/PageBody'
import Button from '../shared/Button'
import Map from '../shared/Map'

import ProjectList from './ProjectList'
import EditProjectForm from './Form'
import DeleteProjectDialog from './DeleteProjectDialog'
import PageFilters from './PageFilters'
import ProjectTabs from './ProjectTabs'

import invoiceApi from '../invoices/api'

import createStoreListComponent from '../shared/StoreList'

import { storeItem } from './listReducer'
import { storeItem as rootStoreItem } from './reducer'

import './projekti.scss'

@connect(state => ({ company: state.companyInfo.data }))
@createStoreListComponent({
    storeName: storeItem.name,
    actions: storeItem.actions,
    rootStoreItem
})
export default class ProjectPage extends Component {
    static defaultProps = {
        items: [],
        list: () => {},
        add: () => {},
        update: () => {},
        remove: () => {},
    }

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
        this.setState({
            filters
        })

        this.props.list({
            filters,
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

    createInvoice = () => {
        invoiceApi.add({
            _id: uid(),
            project_id: this.state.projectForEdit._id,
            user_id: this.state.projectForEdit.created_by,
            client_id: this.state.projectForEdit.client_id,
        })
        this.dismiss()
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

    renderMap = () => {
        return null
    }


    render() {
        const projectForEdit = this.state.projectForEdit === null ? undefined : this.state.projectForEdit
        const projects = this.state.projects.length ? this.state.projects : this.props.items
        const renderFn = this['render' + this.state.activeTab]
        const renderContent = renderFn(projects)

        return (
            <Page name="Projekti">
                <Toaster toasts={this.state.toasts} />
                <Modal isOpen={this.state.isEditModalOpen} onRequestClose={this._executeAfterModalClose}>
                    <EditProjectForm
                        project={projectForEdit}
                        onSubmit={this.submitProject}
                        createInvoice={this.createInvoice}
                        onDismiss={this.dismiss} />
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen}>
                    <DeleteProjectDialog
                        confirm={this.deleteConfirm}
                        dismiss={this.deleteDismiss}
                        project={this.state.projectForDelete} />
                </Modal>

                <PageSubheader>
                    <ProjectTabs activeTab={this.state.activeTab} selectTab={this.selectTab} />

                    <PageFilters filters={this.state.filters} applyFilters={this.applyFilters} />

                    <Button flat color="primary" onClick={this.openNew}>
                        <MdAdd />
                        Novi Projekt
                    </Button>
                </PageSubheader>


                <PageBody>
                    { renderContent }
                </PageBody>

                {
                    this.state.activeTab === 'Map' ? (
                        <Map
                            locations={projects}
                            center={this.props.company && this.props.company.position}
                            height="calc(100vh - 128px)" />
                    ) : null
                }
            </Page>
        )
    }
}
