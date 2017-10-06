import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './button.scss'

import Clickable from './Clickable'

export default class ButtonComponent extends Component {
    static propTypes = {
        color: PropTypes.string,
        className: PropTypes.string,
        iconOnly: PropTypes.bool,
        small: PropTypes.bool,
        clear: PropTypes.bool,
        large: PropTypes.bool,
        block: PropTypes.bool,
        full: PropTypes.bool,
        flat: PropTypes.bool,
    }

    render() {
        const { iconOnly, small, clear, large, block, full, children, color, flat, className, ...rest } = this.props

        return (
            <button className={'btn ' + (color ? (' btn--color-' + color + ' ') : '') + classnames({
                    'btn--icon-only': iconOnly,
                    'btn--small': small,
                    'btn--clear': clear,
                    'btn--large': large,
                    'btn--flat': flat,
                    'btn--block': block,
                    'btn--full': full,
            }) + ' ' + (className || '')} {...rest}>
                <Clickable disabled={this.props.disabled}>
                    <div className="btn__inner">
                        {children}
                    </div>
                </Clickable>
            </button>
        )
    }
}
