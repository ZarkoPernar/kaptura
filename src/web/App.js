import React, { Component } from 'react'
import { Observable } from 'rxjs/Observable'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import RegisterHistory from './RegisterHistory'

import socketService from './socket'

import AppHeader from './AppHeader'
import AppSidenav from './AppSidenav'
import AppBody from './AppBody'
import AppChatSidebar from './AppChatSidebar'

import './App.scss'
import './print.scss'

const TAB_KEY = 9

@withRouter
@connect(state => ({user: state.userInfo.user}))
export default class App extends Component {
    state = {
        menuIsOpen: false,
        isTabbing: false,
        isClicking: false,
    }

    componentDidMount() {
        document.body.addEventListener('click', this.onClick)
        document.body.addEventListener('keydown', this.onKeyDown)

        socketService.companySocket$
            .filter(Boolean)
            .mergeMap(socket => Observable.fromEvent(socket, 'online_users'))
            .subscribe(payload => {
                console.log('online_users', payload)
                // appStore.dispatch({
                //     type: storeItem.types.UPDATE_ITEM_SUCCESS,
                //     payload
                // })
            })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user && nextProps.user._id !== undefined) {
            console.log('socketService.createCompany', nextProps.user.company_id)
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

    render() {
        return (
            <div className="App">
                {/* <RegisterHistory key="history" /> */}

                <AppSidenav />

                <AppHeader />

                <AppBody />

                <AppChatSidebar />

            </div>
        )
    }
}
