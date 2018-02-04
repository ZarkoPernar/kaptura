import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { v4 as uid } from 'uuid'

import './checkbox.scss'

export default class Checkbox extends Component {
    static displayName = 'Checkbox'
    static propTypes = {}
    static defaultProps = {
        onChange: () => {},
    }

    constructor(props) {
        super(props)

        this._id = (props.formName ? props.formName : uid()) + '-' + props.name
    }

    onChange = event => {
        this.props.onChange(event.target.checked, this.props.name)
    }

    render() {
        const id = this.props.id || this._id

        return (
            <div className={classnames('checkbox')}>
                <input
                    id={id}
                    type="checkbox"
                    {...this.props}
                    defaultChecked={this.props.value}
                    onChange={this.onChange}
                />
                <label htmlFor={id}>{this.props.label}</label>
                <span className="checkbox__check" />
            </div>
        )
    }
}
