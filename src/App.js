import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import MdPersonOutline from 'react-icons/lib/md/person-outline'
import moment from 'moment'
import 'moment/locale/hr'

moment.locale('hr')
import MdMenu from 'react-icons/lib/md/menu'

import appStore from './appStore'
import AppSidenav from './AppSidenav'
// import RegisterHistory from './RegisterHistory'
import HomeComponent from './pages/Home'
import TvrtkaComponent from './pages/Tvrtka'
import SatiComponent from './pages/Sati'
import KorisnikComponent from './pages/Korisnik'
import ProjektiComponent from './pages/Projekti'
import LoginComponent from './pages/Login'
import Clock from './clock'

import 'normalize.css'
import './App.scss'
import './pages/pages.scss'

const toggleMenuOpen = ({ menuIsOpen }) => ({
    menuIsOpen: !menuIsOpen,
})

export default class App extends Component {
    state = {
        menuIsOpen: false,
    }

    toggleMenuOpen = (event) => {
        event.stopPropagation()
        this.setState(toggleMenuOpen)
    }

    closeMenu = () => {
        this.setState({
            menuIsOpen: false,
        })
    }

    render() {
        return (
            <Provider store={appStore}>
                <Router basename="/">
                    <div className="App" onClick={this.closeMenu}>
                        {/* <RegisterHistory key="history" /> */}

                        <AppSidenav key="sidenav" isOpen={this.state.menuIsOpen} />

                        <div className="App-heading" key="header">
                            <button className="App-heading__menu-btn" onClick={this.toggleMenuOpen}>
                                <MdMenu />
                            </button>

                            <div style={{ padding: '0.7rem 0px 0px 4rem'}}>
                                <Clock />
                            </div>

                            <NavLink to="/korisnik" className="App-heading__link" key="korisnik" activeClassName="App-heading__link--active" exact>
                                <MdPersonOutline />
                            </NavLink>
                        </div>

                        <div className="App-body" key="body">
                            <Route exact path="/" component={HomeComponent} key="home" />
                            <Route path="/sati" component={SatiComponent} key="sati" />
                            <Route path="/tvrtka" component={TvrtkaComponent} key="tvrtka" />
                            <Route path="/korisnik" component={KorisnikComponent} key="korisnik" />
                            <Route path="/projekti" component={ProjektiComponent} key="projekti" />

                            <Route path="/login" component={LoginComponent} key="login" />
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}
