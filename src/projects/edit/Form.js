import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { geocodeByPlaceId } from 'react-places-autocomplete'

import FormGroup from '../../shared/form/FormGroup'
import Input from '../../shared/form/Input'
import Textarea from '../../shared/form/Textarea'
import FiGi from '../../shared/form/FG'
import Button from '../../shared/Button'
import Datepicker from '../../shared/Datepicker'

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
        console.log(value, name)
        this.setState((prevState) => ({
                project: {
                    ...prevState.project,
                    [name]: value
                }
            }), () => console.log(this.props.project)
        )
    }

    _onAddressSelect = ({ address, placeId }) => {
        geocodeByPlaceId(placeId).then((latLng, results) => {
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
            <form style={{padding: '0 1rem'}} className="EditProject__form" ref={this.getFormEl} onSubmit={this._submit} method="POST" action={'/api/v1/project/' + (this.props.project._id ? 'update' : 'create')}>
                <h3>{this.props.project._id ? 'Izmjeni Projekt' : 'Novi Projekt'}</h3>

                <input name="_id" defaultValue={this.props.project._id} type="text" hidden />

                <FormGroup label="Ime" name="name" onChange={this.inputChanged} value={this.state.project.name}/>

                <FiGi label="Šifra">
                    <Input name="number" onChange={this.inputChanged} value={this.state.project.number} />
                </FiGi>

                <FiGi label="Opis">
                    <Textarea name="description" onChange={this.inputChanged} value={this.state.project.description} />
                </FiGi>

                {/*<FormGroup label="Kategorija" name="category" type="multiselect" onChange={this.inputChanged} value={this.state.project.category} />*/}

                <FiGi label="Počinje">
                    <Datepicker name="start_date" onChange={this.inputChanged} value={this.state.project.start_date} />
                </FiGi>

                <FormGroup label="Završava" name="end_date" type="date" onChange={this.inputChanged} value={this.state.project.end_date} />

                <FormGroup label="Adresa" name="google_address" type="address"
                    onAddressSelect={this._onAddressSelect}
                    onChange={this.inputChanged} value={this.state.project.google_address} />

                <div style={actionStyles}>
                    <Button color="primary" type="submit">
                        {this.props.project._id ? 'Spremi Promjene' : 'Stvori Projekt'}
                    </Button>

                    <Button onClick={this.dismiss} clear style={{marginRight: '25px'}}>
                        Odustani
                    </Button>
                </div>

            </form>
        )
    }
}

export default EditProjectForm
