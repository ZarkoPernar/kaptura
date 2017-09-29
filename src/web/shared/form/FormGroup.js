import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'
import classnames from 'classnames'

import { hasValue } from './utils'
import Label from './Label'

import './form.scss'

class FormGroup extends PureComponent {
    static propTypes = {
        // label: PropTypes.string,
    }

    state = {
        isFocused: false,
    }

    constructor(props) {
        super(props)

        this._id = (props.formName ? props.formName : uid()) + '-' + props.children.props.name
    }

    onFocus = (e) => {
        this.setState({
            isFocused: true,
        })

        if (this.props.children.props.onFocus) {
            this.props.children.props.onFocus(e)
        }
    }

    onBlur = (e) => {
        this.setState({
            isFocused: false,
        })

        if (this.props.children.props.onBlur) {
            this.props.children.props.onBlur(e)
        }
    }

    render() {
        const input = this.props.children
        const value = hasValue(input.props.value)
        const id = input.props.id || this._id

        let labelElement
        let inputElement = React.cloneElement(input, {
            id,
            onBlur: this.onBlur,
            onFocus: this.onFocus,
        })

        if (typeof this.props.label === 'string') {
            labelElement = (
                <Label id={id}>
                    {this.props.label}
                </Label>
            )
        } else if (this.props.label !== null && typeof this.props.label === 'object') {
            labelElement = React.cloneElement(this.props.label, { id })
        }

        const itemLeft = this.props.itemLeft !== undefined ? <div className="form-group__item form-group__item--left">{this.props.itemLeft}</div> : null
        const itemRight = this.props.itemLeft !== undefined ? React.cloneElement(this.props.itemRight, {
            className: 'form-group__item form-group__item--right',
        }) : null

        return (
            <div className={classnames('form-group', {
                    'form-group--inline': this.props.inline,
                    'form-group--is-focused': this.state.isFocused,
                    'form-group--active': value,
                    'form-group--has-error': this.props.error,
                    'form-group--flat': this.props.flat,
                    'form-group--icon-left': this.props.itemLeft !== undefined,
                })} style={this.props.style}>

                    { labelElement }

                    <div className="input-group">
                        { itemLeft }
                        { inputElement }
                        { itemRight }
                    </div>
            </div>
        )
    }
}

export default FormGroup


