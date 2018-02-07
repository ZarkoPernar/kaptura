import React, { Component } from 'react'
import classnames from 'classnames'

import Button from './shared/Button'
import AppSidebar from './shared/AppSidebar'
import Nav from './Nav'

import './AppSidenav.scss'

const AppSidenav = () => {
    return (
        <AppSidebar className="App-sidenav App-sidebar--dark">
            <div className="App-sidenav__container">
                <Nav />

                <div key="logout" className="App-sidenav__logout">
                    <Button href="/auth/logout" block flat>
                        Log Out
                    </Button>
                </div>
            </div>
        </AppSidebar>
    )
}

export default AppSidenav
