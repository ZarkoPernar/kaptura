import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'
import classnames from 'classnames'

import { hasValue } from './utils'
import Label from './Label'

import './form.scss'
import { FormValidationContext } from './Form'
import Checkbox from './Checkbox'

class FormGroup extends PureComponent {
    static propTypes = {
        // label: PropTypes.string,
    }

    constructor(props) {
        super(props)

        if (Children.count(props.children) > 1) {
            throw new Error(
                'FormGroup must have exactly one direct child element',
            )
        }

        const inputElement = props.children

        this.state = {
            isFocused: false,
            id:
                (props.formName !== undefined ? props.formName : uid()) +
                '-' +
                inputElement.props.name,
        }
    }

    onChange = e => {
        // TODO: validate
        if (this.props.onChange !== undefined) {
            this.props.onChange(e)
        }
    }

    onFocus = e => {
        this.setState({
            isFocused: true,
        })
    }

    onBlur = e => {
        this.setState({
            isFocused: false,
        })
    }

    render() {
        const input = this.props.children
        // FIXME: figure out why input.type === Checkbox does not work
        const shouldHideFgLine = input.type.displayName === Checkbox.displayName
        const id = input.props.id || this.state.id

        let labelElement
        const inputElement = this.props.ignoreField
            ? React.cloneElement(input, {
                  id,
                  // We use data-ignore-field attr so we can read
                  // it from the event.target for formik
                  'data-ignore-field': true,
              })
            : React.cloneElement(input, {
                  id,
              })

        if (typeof this.props.label === 'string') {
            labelElement = <Label id={id}>{this.props.label}</Label>
        } else if (
            this.props.label !== null &&
            typeof this.props.label === 'object'
        ) {
            labelElement = React.cloneElement(this.props.label, { id })
        }

        const itemLeft =
            this.props.itemLeft !== undefined ? (
                <div className="form-group__item form-group__item--left">
                    {this.props.itemLeft}
                </div>
            ) : null
        const itemRight =
            this.props.itemLeft !== undefined
                ? React.cloneElement(this.props.itemRight, {
                      className: 'form-group__item form-group__item--right',
                  })
                : null

        return (
            <FormValidationContext.Consumer>
                {({ errors, values }) => {
                    const inputHasValue =
                        input.props.value !== undefined
                            ? hasValue(input.props.value)
                            : hasValue(values[input.props.name])

                    return (
                        <div
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            onFocus={this.onFocus}
                            className={classnames('form-group', {
                                'form-group--inline': this.props.inline,
                                'form-group--is-focused': this.state.isFocused,
                                'form-group--active': inputHasValue,
                                'form-group--has-error':
                                    errors[input.props.name],
                                'form-group--flat': this.props.flat,
                                'form-group--icon-left':
                                    this.props.itemLeft !== undefined,
                            })}
                            style={this.props.style}
                        >
                            {labelElement}

                            <div className="input-group">
                                {itemLeft}
                                {React.cloneElement(inputElement, {
                                    defaultValue:
                                        values[inputElement.props.name],
                                })}
                                {itemRight}
                                {shouldHideFgLine ? null : (
                                    <span className="form-group__line" />
                                )}
                            </div>

                            {errors[input.props.name] ? (
                                <div className="form-group__messages">
                                    {errors[input.props.name]}
                                </div>
                            ) : null}
                        </div>
                    )
                }}
            </FormValidationContext.Consumer>
        )
    }
}

export default FormGroup
