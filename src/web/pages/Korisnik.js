import React, { Component } from 'react'

import Card, { CardBody } from '../shared/Card'
import Button from '../shared/Button'
import FormGroup from '../shared/form/FormGroup'
import Input from '../shared/form/Input'
import * as apiService from '../shared/apiService'
import Toaster from '../shared/toast/Toaster'

import './korisnik.scss'

export default class KorisnikPage extends Component {
    state = {
        userInfo: {
            full_name: '',
        },
    }

    componentWillMount() {
        apiService.get('/user/userInfo')
            .then(({ user }) => {
                this.setState({
                    userInfo: user,
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }

    handleCreateProjectError = (err) => {
        console.log(err)
        this.setState(state => ({
            toasts: [...state.toasts, {
                description: err.message
            }]
        }))
    }

    removeToast = (toast) => {
        this.setState((state) => ({
            toasts: state.toasts.filter(temp => temp.id !== toast.id)
        }))
    }

    inputChanged = (value, propName) => {
        this.setState(state => ({
            userInfo: {
                ...state.userInfo,
                [propName]: value,
            }
        }))
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        apiService.post('/user/update', this.state.userInfo)
    }

    render() {
        return (
            <div className="Korisnik-page page--padding">
                <Card>
                    <CardBody>
                        <form onSubmit={this.onSubmit}>
                            <FormGroup label="Ime i Prezime">
                                <Input name="full_name" onChange={this.inputChanged} value={this.state.userInfo.full_name} />
                            </FormGroup>

                            <Button>
                                Spremi Promjene
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
