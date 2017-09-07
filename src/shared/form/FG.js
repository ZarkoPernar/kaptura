import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { v4 as uid } from 'uuid'
import classnames from 'classnames'

import { hasValue } from './utils'


class FormGroup extends PureComponent {
    static propTypes = {
        label: PropTypes.string,
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

        return (
            <div className={classnames('form-group', {
                    'form-group--active': (this.state.isFocused || value),
                    'form-group--has-error': this.props.error,
                })}>

                {{
                    ...input,
                    props: {
                        ...input.props,
                        id,
                        onBlur: this.onBlur,
                        onFocus: this.onFocus,
                    }
                }}

                <label key="label" htmlFor={id}>
                    {this.props.label}
                </label>
            </div>
        )
    }
}

export default FormGroup


