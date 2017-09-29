import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

const ATTR = 'attributes'
function attributeMutation(mutation) {
    return mutation.type === ATTR
}

class MeasureDimensions extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }


    state = {
        width: 0,
        height: 0,
    }

    componentDidMount() {
        this.notify()
        // window.requestAnimationFrame(this.notify)

        // const config = { subtree: true, attributes: true }
        // this.observer = new MutationObserver(this.checkDebounce)
        // this.observer.observe(this.element, config)
    }

    componentDidUpdate() {
        this.notify()
    }


    componentWillUnmount() {
        // this.observer.disconnect()
    }

    check = (mutations) => {
        mutations.find(attributeMutation)
    }
    checkDebounce = debounce(this.check, 300)

    notify = () => {
        // console.log(`Element size: ${this.element.clientWidth}px x ${this.element.clientHeight}px`);

        if (this.element.clientWidth === this.state.width && this.element.clientHeight === this.state.height) return

        this.setState({
            width: this.element.clientWidth,
            height: this.element.clientHeight,
        })
    }

    getElementRef = (ref) => {
        this.element = ref
    }

    render() {
        return (
            <div ref={this.getElementRef}>
                {
                    React.cloneElement(this.props.children, {
                        hostWidth: this.state.width,
                        hostHeight: this.state.height,
                    })
                }
            </div>
        )
    }
}

export function measureDimensions(target) {
    return <MeasureDimensions>{target}</MeasureDimensions>
}

export default MeasureDimensions;
