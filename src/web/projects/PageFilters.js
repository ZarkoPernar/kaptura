import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MdBook from 'react-icons/lib/md/book'
import MdCancel from 'react-icons/lib/md/cancel'

import Button from '../shared/Button'
import FormGroup from '../shared/form/FormGroup'
import Select from '../shared/form/Select'
import SearchClient from '../clients/SearchClient'

const statusOptions = [{
    value: 0,
    label: 'Stvoreno',
}, {
    value: 10,
    label: 'Zapoceto',
}, {
    value: 20,
    label: 'Faktura Stvorena',
}, {
    value: 30,
    label: 'Placeno',
}, {
    value: 40,
    label: 'Zavrseno',
}, {
    value: 50,
    label: 'Arhivirano',
}]


export default class ProjectFilters extends Component {
    static propTypes = {
        applyFilters: PropTypes.func.isRequired,
    }

    state = {
        clientName: '',
        projectStatus: '',
    }

    filters = {}

    applyFilter = (name, value, comparator = '=') => {
        this.filters = {
            ...this.filters,
            [name]: value ? { comparator, value } : undefined
        }

        this.props.applyFilters(this.filters)
    }

    onClientSelect = (client) => {
        this.setState({
            clientName: client.name
        })
        this.applyFilter('client_id', client._id)
    }

    onStatusSelect = (projectStatus) => {
        this.setState({
            projectStatus
        })
        this.applyFilter('project_status', projectStatus)
    }

    onFilterInputChange = (value, name) => {
        this.setState({
            [name]: value
        })
    }

    clearClient = () => {
        this.setState({
            clientName: ''
        })
        this.applyFilter('client_id')
    }

    clearStatus = () => {
        this.setState({
            projectStatus: ''
        })
        this.applyFilter('project_status')
    }

    render() {
        return [
            <FormGroup
                key="Klijent"
                label="Klijent"
                style={{ marginLeft: 'auto' }}
                inline flat
                itemLeft={<MdBook />}
                itemRight={<Button iconOnly clear onClick={this.clearClient}><MdCancel /></Button>}>
                <SearchClient
                    name="clientName"
                    onSelect={this.onClientSelect}
                    onChange={this.onFilterInputChange}
                    value={this.state.clientName} />
            </FormGroup>,

            <FormGroup
                key="Status"
                label="Status"
                inline flat
                itemRight={<Button iconOnly clear onClick={this.clearStatus}><MdCancel /></Button>}>

                <Select name="projectStatus" onChange={this.onStatusSelect} value={this.state.projectStatus}
                    options={statusOptions} />
            </FormGroup>,
        ]
    }
}
