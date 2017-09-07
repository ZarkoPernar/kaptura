
function toHash(hash, item) {
    hash[item._id] = item
    return hash
}

function toIds(item) {
    return item._id
}

function toItems(id) {
    return this[id]
}

export function toStore(arr=[]) {
    return {
        allIds: arr.map(toIds),
        byId: arr.reduce(toHash, {}),
    }
}

export function fromStore({ allIds, byId }) {
    const ids = allIds || []
    const items = byId || {}
    return ids.map(toItems, items)
}
