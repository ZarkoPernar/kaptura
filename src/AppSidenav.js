import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import appLinks from './const/appLinks'

import './AppSidenav.scss'

const renderedLinks = appLinks.map(link => {
    const Icon = link.icon
    return (
        <NavLink to={link.to} className="App-sidenav__link" key={link.key} activeClassName="App-sidenav__link--active" exact>
            <span className="App-sidenav__link__bg">
                <Icon className="App-sidenav__link__icon" />
                {link.title}
            </span>
        </NavLink>
    )
})

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

                    <nav className="App-sidenav__nav">
                        { renderedLinks }
                    </nav>

                    <div key="logout" className="App-sidenav__logout">
                        <a href="/auth/logout" className="btn btn--block text-center">Log Out</a>
                    </div>
                </div>
            </div>
        )
    }
}
