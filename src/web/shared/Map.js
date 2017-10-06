import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps"

const hasPosition = item => item.latitude && item.longitude
const getPosition = item => ({ key: item._id, pos: getCoords(item.position) })
const getCoords = (center) => {
    if (center.coordinates[0] === undefined) return

    return {
        lat: center.coordinates[1],
        lng: center.coordinates[0],
    }
}

const MapWithDom = withGoogleMap((props) => {
    return (
        <GoogleMap {...props}>
            {props.children}
        </GoogleMap>
    )
})

export default class Map extends Component {
    static propTypes = {
        // locations: PropTypes.arrayOf(PropTypes.shape({
        //     position: {
        //         type: PropTypes.string,
        //         coordinates: PropTypes.arrayOf(PropTypes.number),
        //     }
        // }))
    }

    state = {
        center: null
    }

    constructor(props) {
        super(props)

        if (props.center) {
            this.state.center = getCoords(props.center)
        }
        if (props.locations) {
            this.state.locations = props.locations.filter(hasPosition).map(getPosition)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.center !== this.props.center) {
            this.setState({
                center: getCoords(nextProps.center),
            })
        }

        if (nextProps.locations !== this.props.locations) {
            this.setState({
                locations: nextProps.locations.filter(hasPosition).map(getPosition),
            })
        }
    }


    render() {
        return (
            <MapWithDom
                defaultZoom={12}
                center={this.state.center}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}

                containerElement={<div style={{ height: this.props.height }} />}
                mapElement={<div style={{ height: `100%` }} />}>

                { this.state.locations.map(loc => <Marker key={loc.key} position={loc.pos} />) }
            </MapWithDom>
        )
    }
}
