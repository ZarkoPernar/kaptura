const NOT_FOUND = -1

export function getId(item) {
    if (item._id === undefined) {
        return item.offlineId
    }

    return item._id
}

function findById(item) {
    return getId(item) === this._id
}

export function findByIdAndReplace(array, item) {
    let index = array.findIndex(findById, item)

    if (index !== NOT_FOUND) {
        return [
            ...array.slice(0, index),
            item,
            ...array.slice(index + 1),
        ]
    }

    if (item.offlineId !== undefined) {
        index = array.findIndex(findById, {_id: item.offlineId})

        if (index !== NOT_FOUND) {
            return [
                ...array.slice(0, index),
                item,
                ...array.slice(index + 1),
            ]
        }
    }

    return array
}

export function findByIdAndRemove(array, item) {
    return array.filter(it => item._id !== it._id)
}

