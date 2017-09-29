import React, { Component } from 'react'

import Button from '../shared/Button'
import FormGroup from '../shared/form/FormGroup'
import Input from '../shared/form/Input'
import http from '../shared/httpService'
import Toaster from '../shared/toast/Toaster'

import './korisnik.scss'

export default class LoginPage extends Component {
    state = {
        username: '',
        password: '',
        toasts: [],
    }

    componentWillMount() {

    }

    login = () => {
        http.noApi.post('/auth/login', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.username,

        })
        .then(console.log)
        .catch(this.handleCreateProjectError)
    }

    onChange = (value, name) => {
        this.setState({
            [name]: value
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

    render() {
        return (
            <div className="Korisnik-page">
                <Toaster key="toaster" remove={this.removeToast} toasts={this.state.toasts} />

                <div className="login-container">
                    <FormGroup label="Korisnicko Ime">
                        <Input name="username" value={this.state.username} onChange={this.onChange} />
                    </FormGroup>

                    <FormGroup label="Password">
                        <Input name="password" type="password" value={this.state.password} onChange={this.onChange} />
                    </FormGroup>

                    <div className="login-actions">
                        <Button onClick={this.login}>
                            Login
                        </Button>

                        <a href="/auth/google/login" className="btn btn--color-danger btn--google">
                            Login with Google
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

