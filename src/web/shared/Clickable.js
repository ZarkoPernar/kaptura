import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import classnames from 'classnames'

import Ripple from './Ripple'

import { getScrollHost, createRipple } from './clickableService'

const replaceLastItem = (arr, item) => {
    const copy = arr.slice(0, arr.length - 1)
    copy.push(item)
    return copy
}

export default class Clickable extends Component {
    state = {
        ripples: []
    }

    _element = null
    _scrollHost = null
    _measurements = null

    componentDidMount() {
        this._scrollHost = getScrollHost(document)
    }

    componentWillUnmount() {
        if (this.clearRipples.cancel) {
            this.clearRipples.cancel()
        }
    }

    onMouseDown = (event) => {
        if (this.props.disabled === true) return

        this._measurements = this._element.getBoundingClientRect()

        const ripple = createRipple(event, this._scrollHost)

        this.setState(state => ({
            ripples: [...state.ripples, ripple]
        }))
    }

    onMouseUp = () => {
        if (this.props.disabled === true) return

        this.clearRipples()

        this.setState(state => ({
            ripples: replaceLastItem(state.ripples, { mouseUp: true })
        }))
    }

    _clearRipples = () => {
        this.setState({
            ripples: []
        })
    }

    clearRipples = debounce(this._clearRipples, 800)

    getRef = (ref) => {
        if (!ref) {
            return
        }
        this._element = ref
    }

    render() {
        return (
            <div ref={this.getRef} className={classnames('clickable', {'clickable--bg': this.props.absolute})}>
                <div className="clickable__inner" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                    {this.props.children}
                </div>

                <div className="ripples">
                    {this.state.ripples.map((event) => <Ripple key={event.timeStamp} hostElement={this._measurements} event={event}/>)}
                </div>
            </div>
        )
    }
}
