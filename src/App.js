import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { MdPersonOutline } from 'react-icons/lib/md'
import moment from 'moment'

moment.locale('hr')

import AppSidenav from './AppSidenav'

import HomeComponent from './pages/Home'
import TvrtkaComponent from './pages/Tvrtka'
import KorisnikComponent from './pages/Korisnik'
import ProjektiComponent from './pages/Projekti'

import './App.scss'

export default () => (
  <Router basename="/">
    <div className="App">
      <AppSidenav key="sidenav" />

      <div className="App-heading" key="header">
        <h2>
          Kaptura

          <NavLink to="/korisnik" className="App-heading__link" key="korisnik" activeClassName="App-heading__link--active" exact>
              <MdPersonOutline />
          </NavLink>
        </h2>
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
