import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RenderHelperComponent extends Component {
    static propTypes = {
        if: PropTypes.bool,
        then: PropTypes.any,
        else: PropTypes.any,
        withProps: PropTypes.object,
    }

    static defaultProps = {
        else: null,
        then: null,
    }

    render() {
        const Cmp = this.props.else
        return (
            this.props.if ? (this.props.children || this.props.then) : <Cmp {...this.props.withProps} />
        )
    }
}
