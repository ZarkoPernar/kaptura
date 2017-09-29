import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import classnames from 'classnames'

import Ripple from './Ripple'

const updateLast = (arr, item) => {
    const copy = arr.slice(0, arr.length - 1)
    copy.push(item)
    return copy
}

export default class Clickable extends Component {
    state = {
        ripples: []
    }

    _element = null
    _stuff = null

    componentWillUnmount() {
        if (this.clearRipples.cancel) {
            this.clearRipples.cancel()
        }
    }

    onMouseDown = ({ pageY, pageX }) => {
        if (this.props.disabled === true) return

        this._stuff = this._element.getBoundingClientRect()
        const scrollTop = (document.documentElement ||
            document.body.parentNode ||
            document.body).scrollTop

        this.setState(state => ({
            ripples: [...state.ripples, { pageX, pageY: (pageY - scrollTop) }]
        }))
    }

    onMouseUp = () => {
        if (this.props.disabled === true) return

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

    getRef = (ref) => {
        if (!ref) {
            return
        }
        this._element = ref
        this._stuff = ref.getBoundingClientRect()
    }

    render() {
        return (
            <div ref={this.getRef} className="clickable">
                <div className="clickable__inner" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                    {this.props.children}
                </div>

                <div className="ripples">
                    {this.state.ripples.map((e, i) => <Ripple key={i} hostElement={this._stuff} event={e}/>)}
                </div>
            </div>
        )
    }
}
