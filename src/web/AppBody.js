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
                <Route path="/projekti" component={Projekti} />
                <Route path="/zaposlenici" component={Zaposlenici} />
                {/* <Route path="/projekti/charts" component={ProjectChartsComponent} /> */}
                <Route path="/klijenti" component={Klijenti} />

                <Route path="/fakture" component={InvoicesPage} />

                <Route path="/login" component={LoginComponent} />
            </main>
        )
    }
}
