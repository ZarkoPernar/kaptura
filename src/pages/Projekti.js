import React, { Component } from 'react'
import SkyLight from 'react-skylight'
import { MdAdd } from 'react-icons/lib/md'

import ListTable from '../projects/list/table'
import CreateProjectForm from '../projects/create/Form'

import './projekti.scss'

const dialogStyles = {
    fontSize: '1rem',
    height: 'auto',
}

export default class C extends Component {
    state ={
        projects: [],
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

    sendProject = (project) => {
        this.modal.hide()
        this.formComponent.reset()

        this.setState(({ projects }) => ({ projects: [...projects, project]}))

        createProject(project)
            .then(() => this.getProjects())
    }

    remove = (project) => {
        removeProject(project)
            .then(() => {
                this.setState(({projects}) => {
                    return {
                        projects: projects.filter(pr => pr._id !== project._id)
                    }
                })
            })
    }

    openModal = () => {
        this.modal.show()
    }

    render() {
        return (
            <div className="Projekti">
                <SkyLight dialogStyles={dialogStyles} hideOnOverlayClicked ref={el => { this.modal = el }} key="modal">
                    <CreateProjectForm key="create" onSubmit={this.sendProject} ref={cmp => { this.formComponent = cmp }} />
                </SkyLight>

                <div className="Projekti__controls" key="controls">
                    <button className="btn btn--primary" onClick={this.openModal}>
                        <MdAdd />
                        Novi Projekt
                    </button>
                </div>

                <ListTable projects={this.state.projects} key="table" rowClick={this.remove} />
            </div>
        )
    }
}

function getProjects() {
    return fetch('/api/v1/project/list')
        .then(res => res.json())
}

function createProject(project) {
    return fetch('/api/v1/project/create', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
}

function removeProject(project) {
    return fetch('/api/v1/project/remove', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
}
