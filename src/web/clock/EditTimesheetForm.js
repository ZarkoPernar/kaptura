import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'

import SearchClient from '../clients/SearchClient'
import SearchProject from '../projects/SearchProject'
import { addProjectToItem, addClientFromProjectToItem } from '../projects/utils'
import { addClientData } from '../clients/utils'

import FormGroup from '../shared/form/FormGroup'
import Datepicker from '../shared/Datepicker'
import Timepicker from '../shared/Timepicker'
import Button from '../shared/Button'

const actionStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: '3rem',
    marginBottom: '1rem',
}

class EditTimeForm extends Component {
    static propTypes = {
        selectedTimesheet: PropTypes.object,
        onSubmit: PropTypes.func,
        onDismiss: PropTypes.func,
    }

    static defaultProps = {
        selectedTimesheet: {},
    }

    state = {
        selectedTimesheet: {},
    }

    constructor(props) {
        super(props)

        this.state.selectedTimesheet = props.selectedTimesheet || {}
    }

    getFormEl = el => {
        this._formEl = el
    }

    _submit = event => {
        event.preventDefault()

        const selectedTimesheet = {
            ...this.props.selectedTimesheet, // Original
            ...this.state.selectedTimesheet, // Any edited fields
        }

        if (selectedTimesheet._id === undefined) {
            selectedTimesheet._id = uid()
        }

        this.props.onSubmit(selectedTimesheet)
    }

    inputChanged = (value, name) => {
        this.setState(prevState => ({
            selectedTimesheet: {
                ...prevState.selectedTimesheet,
                [name]: value,
            },
        }))
    }

    onProjectSelect = project => {
        this.setState(prevState => ({
            selectedTimesheet: addClientFromProjectToItem(
                addProjectToItem(prevState.selectedTimesheet, project),
                project,
            ),
        }))
    }

    onClientSelect = client => {
        this.setState(prevState => ({
            selectedTimesheet: addClientData(
                prevState.selectedTimesheet,
                client,
            ),
        }))
    }

    dismiss = e => {
        e.preventDefault()
        this.props.onDismiss()
    }

    render() {
        const timesheetId =
            this.props.selectedTimesheet && this.props.selectedTimesheet._id

        return (
            <form
                style={{ padding: '0 1rem' }}
                className="EditselectedTimesheet__form"
                ref={this.getFormEl}
                onSubmit={this._submit}
                method="POST"
                action={
                    '/api/v1/timesheet/' + (timesheetId ? 'update' : 'create')
                }
            >
                <h3>{timesheetId ? 'Izmjeni Vrijeme' : 'Novo Vrijeme'}</h3>

                <input
                    name="_id"
                    defaultValue={timesheetId}
                    type="text"
                    hidden
                />

                <FormGroup label="Počinje">
                    <Datepicker
                        name="check_in"
                        onChange={this.inputChanged}
                        value={this.state.selectedTimesheet.check_in}
                    />
                </FormGroup>

                <FormGroup label="Počinje">
                    <Timepicker
                        name="check_in"
                        onChange={this.inputChanged}
                        value={this.state.selectedTimesheet.check_in}
                    />
                </FormGroup>

                <FormGroup label="Završava">
                    <Datepicker
                        name="check_out"
                        onChange={this.inputChanged}
                        value={this.state.selectedTimesheet.check_out}
                    />
                </FormGroup>

                <FormGroup label="Završava">
                    <Timepicker
                        name="check_out"
                        onChange={this.inputChanged}
                        value={this.state.selectedTimesheet.check_out}
                    />
                </FormGroup>

                <FormGroup label="Projekt">
                    <SearchProject
                        onSelect={this.onProjectSelect}
                        value={this.state.selectedTimesheet.project_name}
                    />
                </FormGroup>

                <FormGroup label="Klijent">
                    <SearchClient
                        onSelect={this.onClientSelect}
                        value={this.state.selectedTimesheet.client_name}
                    />
                </FormGroup>

                <div style={actionStyles}>
                    <Button color="primary" type="submit">
                        {timesheetId ? 'Spremi Promjene' : 'Stvori Vrijeme'}
                    </Button>

                    <Button
                        onClick={this.dismiss}
                        clear
                        style={{ marginRight: '25px' }}
                    >
                        Odustani
                    </Button>
                </div>
            </form>
        )
    }
}

export default EditTimeForm
