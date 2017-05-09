import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdStore, MdAssignment, MdPeopleOutline, MdBook } from 'react-icons/lib/md'

import './AppSidenav.scss'

export default class C extends Component {
    render() {
        return (
            <div className="App-sidenav">
                <div className="App-sidenav__container">
                <nav className="App-sidenav__nav">
                    <NavLink to="/" className="App-sidenav__link" key="home" activeClassName="App-sidenav__link--active" exact>
                        <span className="App-sidenav__link__bg">
                            <MdDashboard className="App-sidenav__link__icon" />
                            Početna
                        </span>
                    </NavLink>

                    <NavLink to="/tvrtka" className="App-sidenav__link" key="tvrtka" activeClassName="App-sidenav__link--active" exact>
                        <span className="App-sidenav__link__bg">
                            <MdStore className="App-sidenav__link__icon" />
                            Tvrtka
                        </span>
                    </NavLink>

                    <NavLink to="/projekti" className="App-sidenav__link" key="projekti" activeClassName="App-sidenav__link--active" exact>
                        <span className="App-sidenav__link__bg">
                            <MdAssignment className="App-sidenav__link__icon" />
                            Projekti
                        </span>
                    </NavLink>

                    <NavLink to="/skladiste" className="App-sidenav__link" key="skladiste" activeClassName="App-sidenav__link--active" exact>
                        <span className="App-sidenav__link__bg">
                            <MdAssignment className="App-sidenav__link__icon" />
                            Skladište
                        </span>
                    </NavLink>

                    <NavLink to="/zaposlenici" className="App-sidenav__link" key="zaposlenici" activeClassName="App-sidenav__link--active" exact>
                        <span className="App-sidenav__link__bg">
                            <MdPeopleOutline className="App-sidenav__link__icon" />
                            Zaposlenici
                        </span>
                    </NavLink>

                    <NavLink to="/klijenti" className="App-sidenav__link" key="klijenti" activeClassName="App-sidenav__link--active" exact>
                        <span className="App-sidenav__link__bg">
                            <MdBook className="App-sidenav__link__icon" />
                            Klijenti
                        </span>
                    </NavLink>
                </nav>
                </div>
            </div>
        )
    }
}
