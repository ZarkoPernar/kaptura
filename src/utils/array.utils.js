const NOT_FOUND = -1

function findById(item) {
    return item._id === this._id
}

export function findByIdAndReplace(array, item) {
    const index = array.findIndex(findById, item)

    if (index === NOT_FOUND) return array

    return [
        ...array.slice(0, index),
        item,
        ...array.slice(index + 1),
    ]
}
