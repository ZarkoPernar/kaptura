import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { registerRouter } from './shared/httpService.old'
export default class RegisterHistoryComponent extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount() {
        registerRouter(this.context.router)
    }

    render() {
        return null
    }
}
