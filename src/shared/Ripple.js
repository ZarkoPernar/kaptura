import React, { PureComponent } from 'react'

const ANIMATION_TIME = 400
const scaleZero = 'scale(0)'
const scaleOne = 'scale(1)'
const defaultStyle = {
    top: 0,
    left: 0,
    transform: scaleZero,
}

class componentName extends PureComponent {
    state = {
        rippleStyle: defaultStyle,
    }

    _element = null
    min = false

    componentDidMount() {
        const top = (this.props.event.pageY - this.props.hostElement.offsetTop) - this.props.hostElement.clientWidth
        const left = (this.props.event.pageX - this.props.hostElement.offsetLeft) - this.props.hostElement.clientWidth

        this.setState({
            rippleStyle: {
                height: (this.props.hostElement.clientWidth * 2) + 'px',
                width: (this.props.hostElement.clientWidth * 2) + 'px',
                top: top + 'px',
                left: left + 'px',
                transform: scaleOne,
            }
        })

        this.min = false

        this.minTimeout = setTimeout(this.minAnimation, ANIMATION_TIME)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.event.mouseUp === true) {
            this.fadeOut()
        }
    }

    componentWillUnmount() {
        if (this.minTimeout) {
            window.clearTimeout(this.minAnimation)
        }

        if (this.resetTimeout) {
            window.clearTimeout(this.minAnimation)
        }
    }

    minAnimation = () => {
        this.min = true
    }

    fadeOut = () => {
        this.setState(state => ({
            rippleStyle: {
                ...state.rippleStyle,
                opacity: 0,
            }
        }))

        if (!this.min) {
            this.resetTimeout = setTimeout(this.resetStyle, ANIMATION_TIME)
        }

    }

    getRippleRef = (ref) => {
        this._ripple = ref
    }

    render() {
        return (
            <div className="ripple" style={this.state.rippleStyle} ref={this.getRippleRef} />
        );
    }
}

export default componentName;
