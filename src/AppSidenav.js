import React, { Component } from 'react'
import classnames from 'classnames'

import Button from './shared/Button'
import Nav from './Nav'

import './AppSidenav.scss'

export default class AppSidenav extends Component {
    render() {
        return (
            <div className={classnames('App-sidenav', {
                'App-sidenav--is-open': this.props.isOpen,
            })}>
                <div className="App-sidenav__container">
                    <div className="App-logo">
                        <h2 className="App-logo__text">
                            Kaptura
                        </h2>
                    </div>

                    <Nav />

                    <div key="logout" className="App-sidenav__logout">
                        <Button href="/auth/logout" block>Log Out</Button>
                    </div>
                </div>
            </div>
        )
    }
}
