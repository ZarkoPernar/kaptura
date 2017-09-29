import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../shared/form/Input'
import Textarea from '../shared/form/Textarea'
import FormGroup from '../shared/form/FormGroup'
import Button from '../shared/Button'
import Datepicker from '../shared/Datepicker'
import Select from '../shared/form/Select'
import Address from '../shared/Address'
import SearchClient from '../clients/SearchClient'
import { addClientToItem } from '../clients/utils'

const actionStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: '3rem',
    marginBottom: '1rem',
}

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

class EditProjectForm extends Component {
    static propTypes = {
        project: PropTypes.object,
        onSubmit: PropTypes.func,
        onDismiss: PropTypes.func,
    }

    static defaultProps = {
        project: {}
    }

    state = {
        project: {},
    }

    constructor(props) {
        super(props)

        this.state.project = props.project || {}
    }

    getFormEl = (el) => {
        this._formEl = el
    }

    validate = (project) => {
        if (!project.name) {
            throw Error('Project must have a valid name!')
        }
    }

    _submit = (event) => {
        event.preventDefault()

        const project = {
            ...this.props.project, // Original
            ...this.state.project, // Any edited fields
        }

        // try {
        //     this.validate(project)
        // } catch (err) {
        //     // TODO: add ui error notification
        //     return console.error(err)
        // }

        this.props.onSubmit(project)
    }

    inputChanged = (value, name) => {
        this.setState((prevState) => ({
            project: {
                ...prevState.project,
                [name]: value
            }
        }))
    }

    onPlaceChange = (data) => {
        this.setState((prevState) => ({
            project: {
                ...prevState.project,
                ...data
            }
        }))
    }

    onClientSelect = (client) => {
        this.setState((prevState) => ({
            project: addClientToItem(prevState.project, client),
        }))
    }

    dismiss = (e) => {
        e.preventDefault()
        this.props.onDismiss()
    }

    render() {
        return (
            <div className="modal">
                <div className="modal__header">
                    <h2 className="modal__title">{this.props.project._id ? 'Izmjeni Projekt' : 'Novi Projekt'}</h2>
                </div>

                <form
                    className="EditProject__form"
                    ref={this.getFormEl}
                    onSubmit={this._submit}
                    method="POST"
                    action={'/api/v1/project/' + (this.props.project._id ? 'update' : 'create')}>

                    <input name="_id" defaultValue={this.props.project._id} type="text" hidden />

                    <FormGroup label="Ime">
                        <Input name="name" onChange={this.inputChanged} value={this.state.project.name} />
                    </FormGroup>

                    <FormGroup label="Šifra">
                        <Input name="number" onChange={this.inputChanged} value={this.state.project.number} />
                    </FormGroup>

                    <FormGroup label="Opis">
                        <Textarea name="description" onChange={this.inputChanged} value={this.state.project.description} />
                    </FormGroup>

                    <FormGroup label="Počinje">
                        <Datepicker name="start_date" onChange={this.inputChanged} value={this.state.project.start_date} />
                    </FormGroup>

                    <FormGroup label="Završava">
                        <Datepicker name="end_date" onChange={this.inputChanged} value={this.state.project.end_date} />
                    </FormGroup>

                    <FormGroup label="Klijent">
                        <SearchClient name="client_name" onChange={this.inputChanged} onSelect={this.onClientSelect} value={this.state.project.client_name} />
                    </FormGroup>

                    <FormGroup label="Adresa">
                        <Address name="google_address" onChange={this.inputChanged} onPlaceChange={this.onPlaceChange} value={this.state.project.google_address} />
                    </FormGroup>

                    <FormGroup label="Status">
                        <Select name="status" onChange={this.inputChanged} value={this.state.project.status}
                            options={statusOptions} />
                    </FormGroup>

                    {/* <div style={actionStyles}> */}
                    <div className="modal__controls">
                        <Button color="primary" type="submit" large full clear>
                            {this.props.project._id ? 'Spremi' : 'Posalji'}
                        </Button>

                        <Button onClick={this.dismiss} large full clear>
                            Odustani
                        </Button>
                    </div>

                </form>
            </div>
        )
    }
}

export default EditProjectForm
