import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './flex.scss'

export default class componentName extends Component {
    static propTypes = {
        column: PropTypes.bool,
        reverse: PropTypes.bool,
        align: PropTypes.string,
        justify: PropTypes.string,
    }

    static defaultProps = {
        column: false,
        reverse: false,
        grid: false,
        align: '',
        justify: '',
    }

    render() {
        return (
            <div className={classnames('flex', this.props.align, this.props.justify, {
                'flex--column': this.props.column,
                'flex--reverse': this.props.reverse,
                'flex--grid': this.props.grid,
            })}>

                { this.props.children }

            </div>
        )
    }
}
