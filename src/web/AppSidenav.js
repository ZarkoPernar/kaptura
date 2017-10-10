import React, { Component } from 'react'
import classnames from 'classnames'

import Button from './shared/Button'
import Sidebar from './shared/Sidebar'
import Nav from './Nav'

import './AppSidenav.scss'

const AppSidenav = () => {
    return (
        <Sidebar className="App-sidenav">
            <div className="App-sidenav__container">
                <Nav />

                <div key="logout" className="App-sidenav__logout">
                    <Button href="/auth/logout" block flat>Log Out</Button>
                </div>
            </div>
        </Sidebar>
    )
}

export default AppSidenav
