import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { v4 as uid } from 'uuid'
import PlacesAutocomplete from 'react-places-autocomplete'

import googleLibService from '../googleLibService'
import classnames from 'classnames'
import { hasValue, formatValueForCallback, formatValueForInput } from './utils'

import 'react-datepicker/dist/react-datepicker.css'
import './form.scss'

const DEFAULT_INPUT_TYPE = 'text'
const DATE_TYPE = 'date'
const DATE_SHORT_FORMAT = 'DD.MM.YYYY'

// import Select from './Select'
// import Textarea from './Textarea'

class FormGroupComponent extends PureComponent {
    static propTypes = {
        name: PropTypes.string,
        type: PropTypes.string,
        formName: PropTypes.string,
        onChange: PropTypes.func,
    }
    static defaultProps = {
        debounce: 500,
        type: DEFAULT_INPUT_TYPE,
        options: [],
    }

    state = {
        value: '',
        isFocused: false,
        hasValue: false,
        googleLoaded: Boolean(window.google)
    }

    constructor(props) {
        super(props)

        if (this.props.debounce !== undefined) {
            this.notifyChange = debounce(this.notifyChange, props.debounce)
        }

        if (props.value) {
            this.state.value = formatValueForInput(props.value, (props.type))
            this.state.hasValue = hasValue(props.value)
        }

        if (props.type === DATE_TYPE && Boolean(props.value)) {
            this.state.value = moment(props.value)
        }

        this._id = (props.formName ? props.formName : uid()) + '-' + props.name

        this.unsubscribe = googleLibService.subscribe(this.googleLoaded)
    }

    componentWillReceiveProps(nextProps) {
        if (hasValue(nextProps.value)) {
            console.log('props: ' + this.props.name, formatValueForInput(nextProps.value, this.props.type))
            this.setState({
                value: formatValueForInput(nextProps.value, this.props.type),
                hasValue: true,
            })
        }
    }

    // componentWillUpdate() {
    //     console.log('update: ' + this.props.name, this.props.value)
    // }

    componentWillUnmount() {
        if (typeof this.unsubscribe !== 'function') return
        this.unsubscribe()
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

    change = (value) => {
        // this.setState({
        //     value,
        //     hasValue: hasValue(value),
        // })

        this.notifyChange(formatValueForCallback(value), this.props.name)
    }

    notifyChange = (value, name) => {
        this.props.onChange(value, name)
    }

    inputChange = (e) => {
        this.change(e.target.value)
    }

    dateChange = (shortDate) => {
        this.change(
            moment(shortDate, DATE_SHORT_FORMAT),
            this.props.name
        )
    }

    addressChange = (val) => {
        this.change(val, this.props.name)
    }

    googleLoaded = (google) => {
        this.setState({
            googleLoaded: true
        })
    }

    renderGroup = (input) => {
        return (
            <div className={classnames('form-group', {
                    'form-group--active': (this.state.isFocused || this.state.hasValue),
                    'form-group--has-error': this.props.error,
                })}>

                { input }

                <label key="label" htmlFor={this._id}>{this.props.label}</label>
            </div>
        )
    }

    renderText() {
         return (
             <input
                key="input"
                id={this._id}
                name={this.props.name}
                type={this.props.type}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                className="form-control"
                onChange={this.inputChange}
                ref={this.getInputEl}
                value={this.state.value} />
         )
    }

    renderTextarea() {
         return (
             <textarea
                key="input"
                id={this._id}
                name={this.props.name}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                className="form-control"
                onChange={this.inputChange}
                ref={this.getInputEl}
                value={this.state.value} />
         )
    }

    renderAddress() {
        const inputProps = {
            value: this.state.value,
            name: this.props.name,
            onChange: this.addressChange,
            id: this._id,
            onFocus: this.inputFocus,
            onBlur: this.inputBlur,
            autoComplete: false,
        }

        const classNames = {
            input: 'form-control',
            autocompleteContainer: 'form-group__autocomplete-container',
        }

        if (!this.state.googleLoaded) return this.renderText()

        return (
            <PlacesAutocomplete inputProps={inputProps} classNames={classNames} />
        )
    }

    renderDatepicker() {
        return (
            <DatePicker
                dateFormat={DATE_SHORT_FORMAT}
                key="input"
                id={this._id}
                name={this.props.name}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                onChangeRaw={this.inputChange}
                onChange={this.dateChange}
                className="form-control"
                selected={this.state.value}
                ref={this.getInputEl} />
        )
    }

    renderSelect = () => {
        /*return (
            <Select
                id={this._id}
                multi
                className="form-control"
                name={this.props.name}
                value={this.state.value}
                options={options}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                onChange={this.inputChange} />
        )*/
        return (
            <select
                id={this._id}
                multi
                className="form-control"
                name={this.props.name}
                value={this.state.value}
                onFocus={this.inputFocus}
                onBlur={this.inputBlur}
                onChange={this.inputChange}>
                {
                    this.props.options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    })
                }
            </select>
        )
    }

    render() {

        switch (this.props.type) {
            case 'text':
                return this.renderGroup(this.renderText())
            case 'textarea':
                return this.renderGroup(this.renderTextarea())
            case 'select':
                return this.renderGroup(this.renderSelect())
            case 'date':
                return this.renderGroup(this.renderDatepicker())
            case 'address':
                return this.renderGroup(this.renderAddress())
            default:
                return this.renderGroup(this.renderText())
        }


    }
}

export default FormGroupComponent


