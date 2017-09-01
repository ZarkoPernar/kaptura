import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './card.scss'

export default class CardComponent extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div className="card">
                <div className="card__body">
                    { this.props.children }
                </div>
            </div>
        )
    }
}
