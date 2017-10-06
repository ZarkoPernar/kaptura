import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'
import PropTypes from 'prop-types'

import getPlaceData from './getPlaceData'

import googleLibService from '../googleLibService'
import Input from '../form/Input'

const classNames = {
    input: 'form-control',
    root: 'autocomplete-root',
    autocompleteContainer: 'autocomplete-container',
}

import './address.scss'

export default class Address extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        onSelect: PropTypes.func,
    }
    state = {
        googleLoaded: false
    }

    componentDidMount() {
        this.setState({
            googleLoaded: Boolean(window.google)
        })
        this.unsubscribe = googleLibService.subscribe(this.googleLoaded)
    }

    componentWillUnmount() {
        if (typeof this.unsubscribe === 'function') {
            this.unsubscribe()
        }
    }

    onChange = (value) => {
        this.props.onChange(value, this.props.name)
    }

    addressChange = (address, placeId) => {
        this.props.onChange(address, this.props.name)

        this.getPlaceData(placeId)
    }

    getPlaceData = (placeId) => {
        geocodeByPlaceId(placeId)
            .then(this.getPlaceDataSuccess)
            .catch(this.getPlaceDataError)
    }

    getPlaceDataSuccess = (results) => {
        if (!results.length) return

        const result = results[0]

        // console.log(getPlaceData(result));

        const _selected = getPlaceData(result)

        this.setState({ _selected })

        if (this.props.onSelect !== undefined) {
            this.props.onSelect(_selected)
        }

    }

    getPlaceDataError = (error) => {
        console.error(error)
    }

    onError = (error) => {

    }

    render() {
        // const { value, ...filteredProps } = this.props
        // const selected = getValueFromProps(value)

        return this.renderAddress()
    }

    renderText = (inputProps) => {
        return (
            <Input {...inputProps} />
        )
    }

    renderAddress() {
        const inputProps = {
            value: this.props.value,
            name: this.props.name,
            id: this.props.id,
            onChange: this.onChange,
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
            autoComplete: 'off',
        }

        if (!this.state.googleLoaded) return this.renderText(inputProps)

        return (
            <PlacesAutocomplete
                onError={this.onError}
                onSelect={this.addressChange}
                inputProps={inputProps}
                classNames={classNames} />
        )
    }
}
