import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Input from '../shared/form/Input'
import Textarea from '../shared/form/Textarea'
import FormGroup from '../shared/form/FormGroup'
import Button from '../shared/Button'
import Datepicker from '../shared/Datepicker'
import Address from '../shared/Address'

const actionStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: '3rem',
    marginBottom: '1rem',
}

class EditClientForm extends Component {
    static propTypes = {
        client: PropTypes.object,
        onSubmit: PropTypes.func,
        onDismiss: PropTypes.func,
    }

    static defaultProps = {
        client: {}
    }

    state = {
        client: {},
    }

    constructor(props) {
        super(props)

        this.state.client = props.client || {}
    }

    getFormEl = (el) => {
        this._formEl = el
    }

    validate = (client) => {
        if (!client.full_name) {
            throw Error('Project must have a valid full_name!')
        }
    }

    _submit = (event) => {
        event.preventDefault()

        const client = {
            ...this.props.client, // Original
            ...this.state.client, // Any edited fields
        }

        // try {
        //     this.validate(client)
        // } catch (err) {
        //     // TODO: add ui error notification
        //     return console.error(err)
        // }

        this.props.onSubmit(client)
    }

    inputChanged = (value, name) => {
        this.setState((prevState) => ({
            client: {
                ...prevState.client,
                [name]: value
            }
        }))
    }

    onPlaceChange = (data) => {
        this.setState((prevState) => ({
            client: {
                ...prevState.client,
                ...data
            }
        }))
    }

    dismiss = (e) => {
        e.preventDefault()
        this.props.onDismiss()
    }

    render() {
        return (
            <form style={{padding: '0 1rem'}} className="EditProject__form" ref={this.getFormEl} onSubmit={this._submit} method="POST" action={'/api/v1/client/' + (this.props.client._id ? 'update' : 'create')}>
                <h2>{this.props.client._id ? 'Izmjeni informacije o korisniku' : 'Novi Korisnik'}</h2>

                <input name="_id" defaultValue={this.props.client._id} type="text" hidden />

                <FormGroup label="Ime">
                    <Input name="full_name" onChange={this.inputChanged} value={this.state.client.full_name} />
                </FormGroup>

                <FormGroup label="Email">
                    <Input type="email" name="email" onChange={this.inputChanged} value={this.state.client.email} />
                </FormGroup>

                <FormGroup label="Password">
                    <Input name="password" onChange={this.inputChanged} value={this.state.client.password} />
                </FormGroup>

                <div style={actionStyles}>
                    <Button color="primary" type="submit">
                        {this.props.client._id ? 'Spremi' : 'Posalji'}
                    </Button>

                    <Button onClick={this.dismiss} clear style={{marginRight: '25px'}}>
                        Odustani
                    </Button>
                </div>

            </form>
        )
    }
}

export default EditClientForm
