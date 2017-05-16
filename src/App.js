import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { MdPersonOutline } from 'react-icons/lib/md'
import moment from 'moment'
import 'moment/locale/hr'

moment.locale('hr')

import AppSidenav from './AppSidenav'

import HomeComponent from './pages/Home'
import TvrtkaComponent from './pages/Tvrtka'
import KorisnikComponent from './pages/Korisnik'
import ProjektiComponent from './pages/Projekti'

import 'normalize.css'
import './App.scss'

export default function app() {
    return (
        <Router basename="/">
            <div className="App">
            <AppSidenav key="sidenav" />

            <div className="App-heading" key="header">
                <NavLink to="/korisnik" className="App-heading__link" key="korisnik" activeClassName="App-heading__link--active" exact>
                    <MdPersonOutline />
                </NavLink>
            </div>
            <div className="App-body" key="body">
                <Route exact path="/" component={HomeComponent} key="home" />
                <Route path="/tvrtka" component={TvrtkaComponent} key="tvrtka" />
                <Route path="/korisnik" component={KorisnikComponent} key="korisnik" />
                <Route path="/projekti" component={ProjektiComponent} key="projekti" />
            </div>
            </div>
        </Router>
    )
}
