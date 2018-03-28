import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

// import RegisterHistory from './RegisterHistory'

import HomeComponent from './pages/Home'
import TvrtkaComponent from './pages/Tvrtka'
import KorisnikComponent from './pages/Korisnik'
import LoginComponent from './pages/Login'
import Zaposlenici from './employees/Page'
import Klijenti from './clients/Page'
import InventoryPage from './inventory/Page'
// import SatiComponent from './clock/Page'
// import InvoicesPage from './invoices/Page'
// import Projekti from './projects/Page'

function Loader(props) {
    if (props.error) {
        return <div>Error!</div>
    } else if (props.pastDelay) {
        return null
    } else {
        return null
    }
}

const Projekti = Loadable({
    loading: Loader,
    loader: () => import('./projects/Page'),
})

const SatiComponent = Loadable({
    loading: Loader,
    loader: () => import('./clock/Page'),
})

const InvoicesPage = Loadable({
    loading: Loader,
    loader: () => import('./invoices/Page'),
})

export default class AppBody extends Component {
    render() {
        return (
            <main role="main" className="App-body">
                <Route path="/" component={HomeComponent} exact />
                <Route path="/sati" component={SatiComponent} />
                <Route path="/tvrtka" component={TvrtkaComponent} />
                <Route path="/korisnik" component={KorisnikComponent} />
                <Route path="/projekti" component={Projekti} />
                <Route path="/skladiste" component={InventoryPage} />
                <Route path="/zaposlenici" component={Zaposlenici} />
                {/* <Route path="/projekti/charts" component={ProjectChartsComponent} /> */}
                <Route path="/klijenti" component={Klijenti} />

                <Route path="/fakture" component={InvoicesPage} />

                <Route path="/login" component={LoginComponent} />
            </main>
        )
    }
}
