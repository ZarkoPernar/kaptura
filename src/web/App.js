import React, { Component } from 'react'
import { Observable } from 'rxjs/Observable'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import RegisterHistory from './RegisterHistory'

import socketService from './socket'
import { onlineEmployees } from './employees/reducer'
import AppHeader from './AppHeader'
import AppSidenav from './AppSidenav'
import AppBody from './AppBody'
import AppChatSidebar from './AppChatSidebar'

import './App.scss'
import './print.scss'

const TAB_KEY = 9

@withRouter
@connect(state => ({ user: state.userInfo.user }), {
    onlineUsers: onlineEmployees.actions.load,
    addNotif: payload => ({type: 'notifications/ADD_ITEM', payload}),
})
export default class App extends Component {
    state = {
        menuIsOpen: false,
        isTabbing: false,
        isClicking: false,
        isChatOpen: false,
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onClick)
        document.body.addEventListener('keydown', this.onKeyDown)

        socketService.companySocket$
            .mergeMap(socket => Observable.fromEvent(socket, 'online_users'))
            .subscribe(payload => {
                this.props.onlineUsers(payload)
            })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user && nextProps.user._id !== undefined) {
            socketService.createCompany(nextProps.user.company_id)
        }
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

    toggleChat = () => {
        this.setState(state => ({
            isChatOpen: !state.isChatOpen
        }))
    }

    render() {
        return (
            <div className="App">
                {/* <RegisterHistory key="history" /> */}

                <AppSidenav />

                <AppHeader toggleChat={this.toggleChat} />

                <AppBody />

                <AppChatSidebar isOpen={this.state.isChatOpen} />

            </div>
        )
    }
}
