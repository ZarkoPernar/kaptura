import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// import RegisterHistory from './RegisterHistory'

import HomeComponent from './pages/Home'
import TvrtkaComponent from './pages/Tvrtka'
import KorisnikComponent from './pages/Korisnik'
import SatiComponent from './clock/Page'
import LoginComponent from './pages/Login'

import Zaposlenici from './employees/Page'
import Projekti from './projects/Page'
import Klijenti from './clients/Page'
import InvoicesPage from './invoices/Page'

export default class AppBody extends Component {
    render() {
        return (
            <main role="main" className="App-body">
                <Route path="/" component={HomeComponent} exact />
                <Route path="/sati" component={SatiComponent} />
                <Route path="/tvrtka" component={TvrtkaComponent} />
                <Route path="/korisnik" component={KorisnikComponent} />
                <Route path="/projekti" component={Projekti} exact />
                <Route path="/zaposlenici" component={Zaposlenici} exact />
                {/* <Route path="/projekti/charts" component={ProjectChartsComponent} exact /> */}
                <Route path="/klijenti" component={Klijenti} exact />

                <Route path="/fakture" component={InvoicesPage} exact />

                <Route path="/login" component={LoginComponent} />
            </main>
        )
    }
}
