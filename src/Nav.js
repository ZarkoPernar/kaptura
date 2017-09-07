import React, { Component } from 'react'

import Link from './NavLink'
import './nav.scss'

import appLinks from './const/appLinks'


class Nav extends Component {
    state = {
        activeLink: null,
    }

    updateActive = (activeLink) => {
        this.setState({
            activeLink,
        })
    }

    render() {
        return (
            <nav className="nav">
                { appLinks.map(link => <Link key={link.key} link={link} />) }
            </nav>
        )
    }
}


export default Nav
