import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import MdPersonOutline from 'react-icons/lib/md/person-outline'
import MdMenu from 'react-icons/lib/md/menu'

import Clock from './clock'
import Button from './shared/Button'


import './AppHeader.scss'

export default class AppHeader extends Component {

    toggleMenuOpen = (event) => {
        event.stopPropagation()
        document.body.classList.add('App--menuIsOpen')
    }

    render() {
        return (
            <header role="banner" className="App-heading">
                <div className="App-heading__inner">
                    <span className="App-heading__menu-btn">
                        <Button clear iconOnly large onClick={this.toggleMenuOpen}>
                            <MdMenu />
                        </Button>
                    </span>

                    <Clock />

                    <NavLink to="/korisnik" className="App-heading__link" activeClassName="App-heading__link--active" exact>
                        <Button clear iconOnly large>
                            <MdPersonOutline />
                        </Button>
                    </NavLink>
                </div>
            </header>
        )
    }
}
