import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import FormGroup from '../../shared/form/FormGroup'

class CreateProjectForm extends Component {
    state = {
        start_date: moment(),
        end_date: moment(),
    }

    getFormEl = (el) => {
        this._formEl = el
    }

    _submit = (event) => {
        event.preventDefault()

        const projectElements = Array.from(this._formEl.elements)
        console.log(projectElements)
        const project = projectElements
            .filter(el => (el && el.name && el.value))
            .reduce((obj, el) => {
                obj[el.name] = el.value
                return obj
            }, {})

        this.props.onSubmit(project)
    }

    reset = () => {
        Array.from(this._formEl.elements).forEach(el => { el.value = '' })
    }

    inputChanged = (e) => {
        console.log(e)
    }

    render() {
        return (
            <form style={{padding: '0 1rem'}} ref={this.getFormEl} onSubmit={this._submit} method="POST" action="/api/v1/project/create">
                <FormGroup label="Ime" name="name" key="name" onChange={this.inputChanged} />

                <FormGroup label="Šifra" name="number" key="number" onChange={this.inputChanged} />

                <FormGroup label="Opis" name="description" key="description" onChange={this.inputChanged} />

                <FormGroup label="Počinje" name="start_date" key="start_date" type="date" onChange={this.inputChanged} />

                <FormGroup label="Završava" name="end_date" key="end_date" type="date" onChange={this.inputChanged} />


                <button style={{margin: '20px 0'}} className="btn btn--block btn--primary" type="submit">Stvori Novi Projekt</button>
            </form>
        )
    }
}

CreateProjectForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default CreateProjectForm
