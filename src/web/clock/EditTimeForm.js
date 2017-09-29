import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'

import SearchClient from '../clients/SearchClient'
import SearchProject from '../projects/SearchProject'
import { addProjectToItem, addClientFromProjectToItem } from '../projects/utils'
import { addClientToItem } from '../clients/utils'

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
        timeLog: PropTypes.object,
        onSubmit: PropTypes.func,
        onDismiss: PropTypes.func,
    }

    static defaultProps = {
        timeLog: {}
    }

    state = {
        timeLog: {},
    }

    constructor(props) {
        super(props)

        this.state.timeLog = props.timeLog || {}
    }

    getFormEl = (el) => {
        this._formEl = el
    }

    _submit = (event) => {
        event.preventDefault()

        const timeLog = {
            ...this.props.timeLog, // Original
            ...this.state.timeLog, // Any edited fields
        }

        if (timeLog._id === undefined) {
            timeLog._id = uid()
        }

        this.props.onSubmit(timeLog)
    }

    inputChanged = (value, name) => {
        this.setState((prevState) => ({
                timeLog: {
                    ...prevState.timeLog,
                    [name]: value,
                }
            })
        )
    }

    onProjectSelect = (project) => {
        this.setState((prevState) => ({
            timeLog: addClientFromProjectToItem(
                addProjectToItem(
                    prevState.timeLog,
                    project
                ),
                project
            )
        }))
    }

    onClientSelect = (client) => {
        this.setState((prevState) => ({
            timeLog: addClientToItem(prevState.timeLog, client)
        }))
    }


    dismiss = (e) => {
        e.preventDefault()
        this.props.onDismiss()
    }

    render() {
        return (
            <form style={{padding: '0 1rem'}} className="EditTimeLog__form" ref={this.getFormEl} onSubmit={this._submit} method="POST" action={'/api/v1/timesheet/' + (this.props.timeLog._id ? 'update' : 'create')}>
                <h3>{this.props.timeLog._id ? 'Izmjeni Vrijeme' : 'Novo Vrijeme'}</h3>

                <input name="_id" defaultValue={this.props.timeLog._id} type="text" hidden />

                <FormGroup label="Počinje">
                    <Datepicker name="check_in" onChange={this.inputChanged} value={this.state.timeLog.check_in} />
                </FormGroup>

                <FormGroup label="Počinje">
                    <Timepicker name="check_in" onChange={this.inputChanged} value={this.state.timeLog.check_in} />
                </FormGroup>

                <FormGroup label="Završava">
                    <Datepicker name="check_out" onChange={this.inputChanged} value={this.state.timeLog.check_out} />
                </FormGroup>

                <FormGroup label="Završava">
                    <Timepicker name="check_out" onChange={this.inputChanged} value={this.state.timeLog.check_out} />
                </FormGroup>

                <FormGroup label="Projekt">
                    <SearchProject onSelect={this.onProjectSelect} value={this.state.timeLog.project_name} />
                </FormGroup>

                <FormGroup label="Klijent">
                    <SearchClient onSelect={this.onClientSelect} value={this.state.timeLog.client_name} />
                </FormGroup>

                <div style={actionStyles}>
                    <Button color="primary" type="submit">
                        {this.props.timeLog._id ? 'Spremi Promjene' : 'Stvori Vrijeme'}
                    </Button>

                    <Button onClick={this.dismiss} clear style={{marginRight: '25px'}}>
                        Odustani
                    </Button>
                </div>

            </form>
        )
    }
}

export default EditTimeForm
