import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MdCancel from 'react-icons/lib/md/cancel'
import MdSearch from 'react-icons/lib/md/search'
import MdAssignment from 'react-icons/lib/md/assignment'
import MdDate from 'react-icons/lib/md/date-range'
import MdBook from 'react-icons/lib/md/book'

import Button from '../shared/Button'
import FormGroup from '../shared/form/FormGroup'
import SearchClient from '../clients/SearchClient'
import Datepicker from '../shared/Datepicker'
import SearchProject from '../projects/SearchProject'

export default class PageFilters extends Component {
    static propTypes = {
        onFilterChange: PropTypes.func.isRequired,
    }

    state = {
        clientName: '',
    }

    applyFilter = (name, value, comparator = '=') => {
        this.props.onFilterChange({
            ...this.props.filters,
            [name]: value ? { comparator, value } : undefined,
        })
    }

    onClientSelect = client => {
        this.setState({
            clientName: client.name,
        })
        this.applyFilter('client_id', client._id)
    }

    onProjectSelect = project => {
        this.setState({
            projectName: project.name,
        })
        this.applyFilter('project_id', project._id)
    }

    onFilterInputChange = (value, name) => {
        this.setState({
            [name]: value,
        })
    }

    onDateChange = (value, name) => {
        this.setState({
            [name]: value,
        })
        this.applyFilter('check_in', value, '>')
    }

    clearProject = () => {
        this.setState({
            projectName: '',
        })
        this.applyFilter('project_id')
    }
    clearClient = () => {
        this.setState({
            clientName: '',
        })
        this.applyFilter('client_id')
    }
    clearStart = () => {
        this.setState({
            startDate: '',
        })
        this.applyFilter('check_in')
    }

    render() {
        return [
            <FormGroup
                key="Projekt"
                label="Projekt"
                inline
                flat
                itemLeft={<MdAssignment />}
                itemRight={
                    <Button iconOnly clear onClick={this.clearProject}>
                        <MdCancel />
                    </Button>
                }
            >
                <SearchProject
                    name="projectName"
                    onSelect={this.onProjectSelect}
                    onChange={this.onFilterInputChange}
                    value={this.state.projectName}
                />
            </FormGroup>,

            <FormGroup
                key="Klijent"
                label="Klijent"
                inline
                flat
                itemLeft={<MdBook />}
                itemRight={
                    <Button iconOnly clear onClick={this.clearClient}>
                        <MdCancel />
                    </Button>
                }
            >
                <SearchClient
                    name="clientName"
                    onSelect={this.onClientSelect}
                    onChange={this.onFilterInputChange}
                    value={this.state.clientName}
                />
            </FormGroup>,

            <FormGroup
                key="Pocinje"
                label="Pocinje"
                inline
                flat
                itemLeft={<MdDate />}
                itemRight={
                    <Button iconOnly clear onClick={this.clearStart}>
                        <MdCancel />
                    </Button>
                }
            >
                <Datepicker
                    name="startDate"
                    onChange={this.onDateChange}
                    value={this.state.startDate}
                />
            </FormGroup>,
        ]
    }
}
