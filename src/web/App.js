import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// import RegisterHistory from './RegisterHistory'

import AppHeader from './AppHeader'
import AppSidenav from './AppSidenav'
import AppBody from './AppBody'
import AppChatSidebar from './AppChatSidebar'

import './App.scss'
import './print.scss'
import './pages/pages.scss'

const TAB_KEY = 9

export default class App extends Component {
    state = {
        menuIsOpen: false,
        isTabbing: false,
        isClicking: false,
        sidenavInstance: null,
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onClick)
        document.body.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.onClick)
        document.body.removeEventListener('keydown', this.onKeyDown)
    }

    onClick = () => {
        document.body.classList.add('App--is-clicking')
        document.body.classList.remove('App--is-tabbing')
        document.body.classList.remove('App--menuIsOpen')
    }

    onKeyDown = (event) => {
        if (event.keyCode === TAB_KEY) {
            document.body.classList.add('App--is-tabbing')
            document.body.classList.remove('App--is-clicking')
        }
    }

    getSidenav = (sidenavInstance) => {
        this.setState({sidenavInstance})
    }

    render() {
        return (
            <div className="App">
                {/* <RegisterHistory key="history" /> */}

                <AppSidenav ref={this.getSidenav} />

                <AppHeader sidenavInstance={this.state.sidenavInstance} />

                <AppBody />

                <AppChatSidebar />

            </div>
        )
    }
}
