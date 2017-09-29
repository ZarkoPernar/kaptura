import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/hr'

moment.locale('hr')

import appStore from './appStore'
import App from './App'

import 'normalize.css'

export default class Root extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <Router basename="/">
                    <App />
                </Router>
            </Provider>
        )
    }
}
