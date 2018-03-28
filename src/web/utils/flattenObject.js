import { isObject } from 'util'

export function flattenObject(obj, prefix = '') {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        if (isObject(val)) {
            return Object.assign(acc, flattenObject(val, prefix + key + '.'))
        }

        return Object.assign(acc, {
            [prefix + key]: val,
        })
    }, {})
}

export function unflattenObject(target, opts) {
    opts = opts || {}

    var delimiter = opts.delimiter || '.'
    var overwrite = opts.overwrite || false
    var result = {}

    if (Object.prototype.toString.call(target) !== '[object Object]') {
        return target
    }

    // safely ensure that the key is
    // an integer.
    function getkey(key) {
        var parsedKey = Number(key)

        return isNaN(parsedKey) || key.indexOf('.') !== -1 || opts.object
            ? key
            : parsedKey
    }

    var sortedKeys = Object.keys(target).sort(function(keyA, keyB) {
        return keyA.length - keyB.length
    })

    sortedKeys.forEach(function(key) {
        var split = key.split(delimiter)
        var key1 = getkey(split.shift())
        var key2 = getkey(split[0])
        var recipient = result

        while (key2 !== undefined) {
            var type = Object.prototype.toString.call(recipient[key1])
            var isobject =
                type === '[object Object]' || type === '[object Array]'

            // do not write over falsey, non-undefined values if overwrite is false
            if (
                !overwrite &&
                !isobject &&
                typeof recipient[key1] !== 'undefined'
            ) {
                return
            }

            if (
                (overwrite && !isobject) ||
                (!overwrite && recipient[key1] == null)
            ) {
                recipient[key1] =
                    typeof key2 === 'number' && !opts.object ? [] : {}
            }

            recipient = recipient[key1]
            if (split.length > 0) {
                key1 = getkey(split.shift())
                key2 = getkey(split[0])
            }
        }

        // unflatten again for 'messy objects'
        recipient[key1] = unflattenObject(target[key], opts)
    })

    return result
}
