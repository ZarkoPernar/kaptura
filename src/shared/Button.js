import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import './button.scss'

class ButtonComponent extends Component {
    render() {
        const { iconOnly, small, clear, children, color, ...rest } = this.props
        return (
            <button className={'btn ' + (color ? ('btn--color-' + color + ' ') : '') + classnames({
                'btn--icon-only': iconOnly,
                'btn--small': small,
                'btn--clear': clear,
            })} {...rest}>
                {children}
            </button>
        )
    }
}

ButtonComponent.propTypes = {

}

export default ButtonComponent
