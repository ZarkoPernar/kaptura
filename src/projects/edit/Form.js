import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'
import { geocodeByPlaceId } from 'react-places-autocomplete'

import FormGroup from '../../shared/form/FormGroup'
import Button from '../../shared/Button'

const actionStyles = {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    marginTop: '3rem',
    marginBottom: '1rem',
}

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

        if (project._id === undefined) {
            project._id = uid()
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
                project: Object.assign(prevState.project, {
                    [name]: value
                })
            })
        )
    }

    _onAddressSelect = ({ address, placeId }) => {
        geocodeByPlaceId(placeId, (err, latLng, results) => {
            console.log(latLng, results)
            const res = results[0]
            this.setState({
                project: {
                    latitude: latLng.lat,
                    longitude: latLng.lng,
                }
            })
        })
    }

    dismiss = (e) => {
        e.preventDefault()
        this.props.onDismiss()
    }

    render() {
        return (
            <form style={{padding: '0 1rem'}} ref={this.getFormEl} onSubmit={this._submit} method="POST" action={'/api/v1/project/' + (this.props.project._id ? 'update' : 'create')}>
                <h3 key="title">
                    {this.props.project._id ? 'Izmjeni Projekt' : 'Novi Projekt'}
                </h3>
                <input key="_id" name="_id" defaultValue={this.props.project._id} type="text" hidden />

                <FormGroup label="Ime" name="name" key="name" onChange={this.inputChanged} value={this.props.project.name}/>

                <FormGroup label="Šifra" name="number" key="number" onChange={this.inputChanged} value={this.props.project.number} />

                {/*<FormGroup label="Kategorija" name="category" key="category" type="multiselect" onChange={this.inputChanged} value={this.props.project.category} />*/}

                <FormGroup label="Opis" type="textarea" name="description" key="description" onChange={this.inputChanged} value={this.props.project.description} />

                <FormGroup label="Počinje" name="start_date" key="start_date" type="date" onChange={this.inputChanged} value={this.props.project.start_date} />

                <FormGroup label="Završava" name="end_date" key="end_date" type="date" onChange={this.inputChanged} value={this.props.project.end_date} />

                <FormGroup label="Adresa" name="google_address" key="google_address" type="address"
                    onAddressSelect={this._onAddressSelect}
                    onChange={this.inputChanged} value={this.props.project.google_address} />

                <div style={actionStyles} key="actions">
                    <Button key="yes" color="primary" type="submit">
                        {this.props.project._id ? 'Spremi Promjene' : 'Stvori Projekt'}
                    </Button>

                    <Button key="no" onClick={this.dismiss} clear style={{marginRight: '25px'}}>
                        Odustani
                    </Button>
                </div>

            </form>
        )
    }
}

export default EditProjectForm
