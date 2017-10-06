
const LIST_FIELDS = ['address1', 'city', 'state', 'country_code', 'zip']


function validateAddressComponents(obj, options={}) {
    let invalid = []

    if (!obj || typeof obj !== 'object') {
        return {isValid: false, listInvalidComponents: LIST_FIELDS}
    }

    LIST_FIELDS.forEach((addressComponent) => {
        if (!obj[addressComponent]) {
            invalid.push(addressComponent)
        }
    })

    return {isValid: !invalid.length, listInvalidComponents: invalid}
}

function revertToOriginal(applyTo, original) {
    LIST_FIELDS.forEach((key) => {
        if ((applyTo[key] && original[key]) || (original[key] && !applyTo[key])) {
            applyTo[key] = original[key]
        } else if (applyTo[key] && !original[key]) {
            applyTo[key] = null
        }
    })
}



