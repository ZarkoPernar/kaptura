import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import classnames from 'classnames'
import './button.scss'

import Ripple from './Ripple'

const updateLast = (arr, item) => {
    const copy = arr.slice(0, arr.length - 1)
    copy.push(item)
    return copy
}

class ButtonComponent extends Component {
    state = {
        ripples: []
    }

    _button = null

    componentWillUnmount() {
        if (this.clearRipples.cancel) {
            this.clearRipples.cancel()
        }
    }

    onMouseDown = ({ pageY, pageX }) => {
        this.setState(state => ({
            ripples: [...state.ripples, { pageX, pageY }]
        }))
    }

    onMouseUp = () => {
        this.clearRipples()

        this.setState(state => ({
            ripples: updateLast(state.ripples, { mouseUp: true })
        }))
    }

    _clearRipples = () => {
        this.setState({
            ripples: []
        })
    }

    clearRipples = debounce(this._clearRipples, 800)

    getButtonRef = (ref) => {
        this._button = ref
    }

    render() {
        const { iconOnly, small, clear, large, block, children, color, ...rest } = this.props

        return (
            <button
                ref={this.getButtonRef}
                className={'btn ' + (color ? ('btn--color-' + color + ' ') : '') + classnames({
                    'btn--icon-only': iconOnly,
                    'btn--small': small,
                    'btn--clear': clear,
                    'btn--large': large,
                    'btn--block': block,
                })}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onFocus={this.onFocus}
                {...rest}>

                {children}

                <div className="ripples">
                    {this.state.ripples.map((e, i) => <Ripple key={i} hostElement={this._button} event={e}/>)}
                </div>
            </button>
        )
    }
}

ButtonComponent.propTypes = {

}

export default ButtonComponent
