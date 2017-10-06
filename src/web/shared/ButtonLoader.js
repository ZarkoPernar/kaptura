import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import MDSpinner from 'react-md-spinner'

import './button.scss'

import MeasureDimensions from './MeasureDimensions'
import Button from './Button'

export default class ButtonLoaderComponent extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        minLoading: PropTypes.number,
    }

    static defaultProps = {
        color: '',
        minLoading: 1000,
    }

    state = {
        color: 'success',
        loaded: true,
    }

    lastCall = 0

    constructor(props) {
        super(props)

        this.state.loaded = !props.loading
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.props.loading) {
            if (nextProps.loading === true) {
                this.lastCall = Date.now()

                this.setState({
                    loaded: false
                })

                setTimeout(this.reset, this.props.minLoading)
            } else {
                if (Date.now() - this.lastCall > this.props.minLoading) {
                    this.setState({
                        loaded: true
                    })
                }
            }
        }
    }

    onMeasure = ({ width }) => {
        this.minWidth = width
    }

    reset = () => {
        if (this.props.loading) return

        this.setState({
            loaded: true
        })
    }

    render() {
        const { loading, minLoading, ...rest } = this.props

        return (
            <MeasureDimensions onMeasure={this.onMeasure} display="inline-block">
                <Button color={this.state.hasColor ? this.state.color : this.props.color} {...rest} disabled={!this.state.loaded} style={{minWidth: this.minWidth}}>
                        {this.state.loaded ? this.props.children : <MDSpinner size={20} />}
                </Button>
            </MeasureDimensions>
        )
    }
}
