
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

export function toStoreMerge(array = [], store) {
    const allIds = Array.isArray(store.allIds) ? [...store.allIds] : []
    const byId = store.byId !== undefined ? {...store.byId} : {}

    for (let index = 0; index < array.length; index++) {
        let element = array[index]

        if (byId[element._id] === undefined) {
            allIds.push(element._id)
        }

        byId[element._id] = element
    }

    return { allIds, byId, }
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
