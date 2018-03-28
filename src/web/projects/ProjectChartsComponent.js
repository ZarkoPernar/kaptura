import React, { Component } from 'react'

import * as apiService from '../shared/apiService'
import Card from '../shared/Card'

class ProjectChartsComponent extends Component {
    componentDidMount() {
        this.getProjects()
    }

    getProjects = () => {
        getProjects({})
            .then(res => {
                this.setState({ projects: res })
            })
            .catch(console.error)
    }

    render() {
        return (
            <div className="page page--padding">
                <Card>Charts</Card>
            </div>
        )
    }
}

export default ProjectChartsComponent

function getProjects(params) {
    return apiService.post('/project/list', params)
}
