import React, { Component } from 'react'
import classnames from 'classnames'

import Button from './shared/Button'
import Sidebar from './shared/Sidebar'
import Nav from './Nav'

import './AppSidenav.scss'

const toggleIsOpen = state => ({
    isOpen: !state.isOpen
})

export default class AppSidenav extends Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        document.body.addEventListener('click', this.close)
    }

    close = () => {
        this.setState({
            isOpen: false,
        })
    }

    // this is for outside use
    toggle = () => {
        this.setState(toggleIsOpen)
    }

    render() {
        return (
            <Sidebar isOpen={this.state.isOpen} className="App-sidenav">
                <div className="App-sidenav__container">
                    <Nav />

                    <div key="logout" className="App-sidenav__logout">
                        <Button href="/auth/logout" block>Log Out</Button>
                    </div>
                </div>
            </Sidebar>
        )
    }
}
