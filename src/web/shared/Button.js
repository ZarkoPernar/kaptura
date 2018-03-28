import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import './button.scss'

import { getScrollHost, createRipple } from './clickableService'
import Ripple from './Ripple'

const replaceLastItem = (arr, item) => {
    const copy = arr.slice(0, arr.length - 1)
    copy.push(item)
    return copy
}

export default class Button extends Component {
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
        outline: PropTypes.bool,
    }

    state = {
        ripples: [],
        measurements: null,
    }

    _element = null
    _scrollHost = null

    componentDidMount() {
        this._scrollHost = getScrollHost(document)
    }

    componentWillUnmount() {
        if (this.clearRipples.cancel) {
            this.clearRipples.cancel()
        }
    }

    onMouseDown = event => {
        const isRightMouseClick = event.nativeEvent.which !== 1
        const buttonIsDisabled = this.props.disabled === true

        if (buttonIsDisabled || isRightMouseClick) return

        // we must collect measurements on every click
        // beacause the button dimensions may have changed
        const measurements = this._element.getBoundingClientRect()

        const ripple = createRipple(event, this._scrollHost)

        this.setState(state => ({
            measurements,
            ripples: [...state.ripples, ripple],
        }))
    }

    onMouseUp = event => {
        if (this.props.disabled === true || event.nativeEvent.which !== 1)
            return

        this.clearRipples()

        this.setState(state => ({
            ripples: replaceLastItem(state.ripples, { mouseUp: true }),
        }))
    }

    onMouseLeave = event => {
        if (this.state.ripples.length === 0) return

        this.clearRipples()

        this.setState(state => ({
            ripples: replaceLastItem(state.ripples, { mouseUp: true }),
        }))
    }

    _clearRipples = () => {
        this.setState({
            ripples: [],
        })
    }

    clearRipples = debounce(this._clearRipples, 800)

    getRef = ref => {
        if (!ref) return

        this._element = ref

        this.setState({
            measurements: ref.getBoundingClientRect(),
        })
    }

    render() {
        const {
            iconOnly,
            iconLeft,
            small,
            clear,
            large,
            block,
            full,
            children,
            color,
            flat,
            outline,
            className,
            ...rest
        } = this.props

        return (
            <button
                ref={this.getRef}
                type="button"
                className={classnames(
                    'btn',
                    className || '',
                    color ? ' btn--color-' + color + ' ' : '',
                    {
                        'btn--icon-only': iconOnly,
                        'btn--icon-left': iconLeft,
                        'btn--small': small,
                        'btn--clear': clear,
                        'btn--outline': outline,
                        'btn--large': large,
                        'btn--flat': flat,
                        'btn--block': block,
                        'btn--full': full,
                    },
                )}
                {...rest}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseLeave}
            >
                {children}

                <div className="ripples">
                    {this.state.ripples.map((e, i) => (
                        <Ripple
                            key={i}
                            hostElement={this.state.measurements}
                            event={e}
                        />
                    ))}
                </div>
            </button>
        )
    }
}
