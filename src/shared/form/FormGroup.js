import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import debounce from 'lodash/debounce'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import activeClass from '../../utils/activeClass'

import 'react-datepicker/dist/react-datepicker.css'
import './form.scss'

const DEFAULT_INPUT_TYPE = 'text'

class FormGroupComponent extends Component {
    state = {
        date: '',
        isFocused: false,
        hasValue: false,
    }

    constructor(props) {
        super(props)

        if (this.props.debounce !== undefined) {
            this.inputChange = debounce(this.inputChange, this.props.debounce)
        }

        this._id = (props.formName ? props.formName : v4()) + '-' + props.name
    }

    getInputEl = (el) => {
        this.inputEl = el
    }

    inputFocus = (e) => {
        this.setState({
            isFocused: true,
        })
    }

    inputBlur = (e) => {
        this.setState({
            isFocused: false,
        })
    }

    inputChange = (e) => {
        this.setState({
            hasValue: Boolean(e.target.value),
        })

        this.props.onChange(e.target.value)
    }

    dateChange = (m) => {
        this.setState({
            hasValue: true,
            date: m,
        })

        this.props.onChange(m)
    }

    renderInput = () => {
        if (this.props.type === undefined || this.props.type === 'text') {
            return this.renderText()
        } else if (this.props.type === 'date') {
            return this.renderDatepicker()
        }
    }

    renderText() {
         return (
             <input
                key="input"
                id={this._id}
                name={this.props.name}
                type={this.props.type || DEFAULT_INPUT_TYPE}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                className="form-control"
                onChange={this.inputChange}
                ref={this.getInputEl} />
         )
    }

    renderDatepicker() {
        return (
            <DatePicker
                key="input"
                id={this._id}
                name={this.props.name}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                onChangeRaw={this.inputChange}
                onChange={this.dateChange}
                className="form-control"
                selected={this.state.date} />
        )
    }

    render() {
        return (
            <div className={'form-group ' + activeClass({'form-group--active': (this.state.isFocused || this.state.hasValue)})}>
                {this.renderInput()}

                <label key="label" htmlFor={this._id}>{this.props.label}</label>
            </div>
        )
    }
}

FormGroupComponent.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    formName: PropTypes.string,
    onChange: PropTypes.func,
}

export default FormGroupComponent
