import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'
import { geocodeByPlaceId } from 'react-places-autocomplete'

import SearchProject from '../projects/SearchProject'
import FormGroup from '../shared/form/FormGroup'
import Button from '../shared/Button'
import { addProjectToItem } from '../projects/utils'

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

    validate = (timeLog) => {
        // if (!timeLog.name) {
        //     throw Error('TimeLog must have a valid name!')
        // }
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

        // try {
        //     this.validate(timeLog)
        // } catch (err) {
        //     // TODO: add ui error notification
        //     return console.error(err)
        // }

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

    _onAddressSelect = ({ address, placeId }) => {
        geocodeByPlaceId(placeId, (err, latLng, results) => {
            console.log(latLng, results)
            const res = results[0]
            this.setState({
                timeLog: {
                    latitude: latLng.lat,
                    longitude: latLng.lng,
                }
            })
        })
    }

    onProjectSelect = (project) => {
        this.setState((prevState) => ({
            timeLog: addProjectToItem(prevState.timeLog, project)
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

                <FormGroup label="Počinje" name="check_in" type="date" onChange={this.inputChanged} value={this.state.timeLog.check_in} />
                <FormGroup label="Počinje" name="check_in" type="time" onChange={this.inputChanged} value={this.state.timeLog.check_in} />

                <FormGroup label="Završava" name="check_out" type="date" onChange={this.inputChanged} value={this.state.timeLog.check_out} />
                <FormGroup label="Završava" name="check_out" type="time" onChange={this.inputChanged} value={this.state.timeLog.check_out} />

                <SearchProject onSelect={this.onProjectSelect} />

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
