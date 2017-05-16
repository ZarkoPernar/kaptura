import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../shared/Button'
import FormGroup from '../../shared/form/FormGroup'

const actionStyles = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '2rem',
}

class DeleteProjectDialog extends Component {
    state = {
        nameInput: '',
        nameInputError: null,
    }

    confirm = () => {
        if (this.state.nameInput !== this.props.project.name) {
            return this.setState({
                nameInputError: {
                    message: 'Ovaj input je obavezan'
                },
            })
        }

        this.props.confirm()
    }

    dismiss = () => {
        this.props.dismiss()
    }

    nameInputChange = (val) => {
        this.setState({
            nameInput: val,
        })
    }

    render() {
        return (
            <div>
                <h3 key="title">Jeste li sigurni da zelite obrisati ovaj projekt?</h3>
                <p key="description">
                    Upisite ime projekta kako bi ste potvrdili brisanje. Ova akcija je permanentna.
                </p>

                <FormGroup key="input" name="name" label="Ime Projekta" onChange={this.nameInputChange} error={this.state.nameInputError} />

                <div style={actionStyles} key="actions">
                    <Button key="yes" onClick={this.confirm} color="danger" style={{marginRight: '15px'}}>
                        Obrisi Projekt
                    </Button>

                    <Button key="no" onClick={this.dismiss} clear color="primary">
                        Odustani
                    </Button>
                </div>
            </div>
        )
    }
}

DeleteProjectDialog.propTypes = {
    project: PropTypes.object,
    confirm: PropTypes.func,
    dismiss: PropTypes.func,
}

export default DeleteProjectDialog
