import React, { Component } from 'react'
import classnames from 'classnames'

import './button.scss'

import Clickable from './Clickable'

class ButtonComponent extends Component {
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

ButtonComponent.propTypes = {

}

export default ButtonComponent
