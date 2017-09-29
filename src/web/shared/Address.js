import React, { Component } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete'

import googleLibService from './googleLibService'
import Input from './form/Input'

const classNames = {
    input: 'form-control',
    root: 'autocomplete-root',
    autocompleteContainer: 'autocomplete-container',
}

import './address.scss'

class Address extends Component {
    state = {
        googleLoaded: false
    }

    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        if (typeof this.unsubscribe !== 'function') return
            this.unsubscribe()
    }

    componentDidMount() {
        this.setState({
            googleLoaded: Boolean(window.google)
        })
        this.unsubscribe = googleLibService.subscribe(this.googleLoaded)
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
        const latLng = result.geometry.location

        if (!this.props.onPlaceChange) return

        this.props.onPlaceChange({
            place_id: result.place_id,
            google_formatted_address: result.formatted_address,
            latitude: latLng.lat(),
            longitude: latLng.lng(),
        })
    }

    getPlaceDataError = (error) => {
        console.error(error)
    }

    render() {
        // const { value, ...filteredProps } = this.props
        // const selected = getValueFromProps(value)

        return this.renderAddress()
    }

    renderText = (inputProps) => {
        return (
            <Input value={this.props.value} />
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
                onSelect={this.addressChange}
                inputProps={inputProps}
                classNames={classNames} />
        )
    }
}

export default Address
