import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import MdPersonOutline from 'react-icons/lib/md/person-outline'
import moment from 'moment'
import 'moment/locale/hr'
import classnames from 'classnames'

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
import Button from './shared/Button'
import ProjectChartsComponent from './projects/ProjectChartsComponent'

import 'normalize.css'
import './App.scss'
import './pages/pages.scss'

const toggleMenuOpen = ({ menuIsOpen }) => ({
    menuIsOpen: !menuIsOpen,
})

const TAB_KEY = 9

export default class App extends Component {
    state = {
        menuIsOpen: false,
        isTabbing: false,
        isClicking: false,
    }

    toggleMenuOpen = (event) => {
        event.stopPropagation()
        this.setState(toggleMenuOpen)
    }

    onClick = () => {
        this.setState({
            menuIsOpen: false,
            isClicking: true,
            isTabbing: false,
        })
    }

    onKeyDown = (event) => {
        if (event.keyCode === TAB_KEY) {
            this.setState({
                isTabbing: true,
                isClicking: false,
            })
        }
    }

    render() {
        return (
            <Provider store={appStore}>
                <Router basename="/">
                    <div className={classnames('App', {
                        'App--is-tabbing': this.state.isTabbing,
                        'App--is-clicking': this.state.isClicking,
                    })} onClick={this.onClick} onKeyDown={this.onKeyDown}>
                        {/* <RegisterHistory key="history" /> */}

                        <AppSidenav isOpen={this.state.menuIsOpen} />

                        <div className="App-heading">
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

                        <div className="App-body">
                            <Route path="/" component={HomeComponent} exact />
                            <Route path="/sati" component={SatiComponent} />
                            <Route path="/tvrtka" component={TvrtkaComponent} />
                            <Route path="/korisnik" component={KorisnikComponent} />
                            <Route path="/projekti" component={ProjektiComponent} exact />
                            <Route path="/projekti/charts" component={ProjectChartsComponent} exact />

                            <Route path="/login" component={LoginComponent} />
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}
