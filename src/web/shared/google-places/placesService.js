

/**
 * assignPlaceDataToItem - description
 *
 * @param  {object.<GooglePlace>} place description
 * @param  {object.<any>} obj  description
 * @return {object.<any>}      returns a clone of the original obj with the new place data
 */
export function assignPlaceDataToItem(place, obj) {
    let newObj

    if (!place || typeof place !== 'object') {
        return obj
    }

    newObj = { ...obj }

    // if there is a street number or just a street name add name to project.address
    if (place.types[0] === 'street_address' || place.types[0] === 'route') {
        newObj.address = place.name
    }

    newObj.google_address = place.formatted_address

    // extract the rest of location data (city, state, zip)
    place.address_components.forEach(component => {
        if (component.types[0] === 'locality') {
            newObj.city = component.long_name
        } else if (component.types[0] === 'administrative_area_level_1') {
            newObj.state = component.short_name.length === 2 ? component.short_name : component.short_name.substring(0,2)
        } else if (component.types[0] === 'postal_code') {
            newObj.zip = component.long_name
        } else if (component.types[0] === 'country') {
            newObj.country_code = getCountryCode(component.short_name)
        }
    })

    // extract geo location data (lat, lng)
    newObj.latitude = place.geometry.location.lat()
    newObj.longitude = place.geometry.location.lng()

    return newObj
}


function getCountryCode(twoCharCode) {
    const cc = {
        US: 'USA',
        CA: 'CAN',
        MX: 'MEX'
    }
    return cc[twoCharCode]
}


