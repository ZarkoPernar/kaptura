import React, { Component } from 'react'

import Card from '../shared/Card'
import Button from '../shared/Button'
import FormGroup from '../shared/form/FormGroup'
import * as apiService from '../shared/apiService'
import Toaster from '../shared/toast/Toaster'

import './korisnik.scss'

export default class KorisnikPage extends Component {
    state = {
        userInfo: {},
    }

    componentWillMount() {
        apiService.get('/user/userInfo')
            .then((res) => {
                this.setState({
                    userInfo: res,
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
                    <form onSubmit={this.onSubmit}>

                        <FormGroup label="Ime i Prezime" name="full_name" key="full_name" onChange={this.inputChanged} value={this.state.userInfo.full_name}/>

                        <Button>
                            Spremi Promjene
                        </Button>
                    </form>
                </Card>
            </div>
        )
    }
}
