import { findByIdAndReplace, findByIdAndRemove } from './array.utils'


export const defaultState = {
    byId: {},
    allIds: [],
}

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

function findById(id) {
    return id === this._id
}

export function unshiftStoreList(state, payload) {
    const logs = fromStore(state)
    const updatedLogs = [payload, ...logs]

    return toStore(updatedLogs, state)
}

export function updateStoreList(state, payload, findByIdPropName) {
    let index = state.allIds.findIndex(findById, { _id: payload[findByIdPropName || '_id'] })
    let allIds = state.allIds
    let byId = state.byId

    if (index !== -1) {
        allIds = [
            ...state.allIds.slice(0, index),
            payload._id,
            ...state.allIds.slice(index + 1),
        ]
    }

    if (findByIdPropName !== undefined) {
        byId = { ...state.byId }
        delete byId[payload[findByIdPropName]]
    }

    return {
        allIds,
        byId: {
            ...byId,
            [payload._id]: payload
        }
    }
}

export function removeItemInStoreList(state, payload) {
    const logs = fromStore(state)

    const updatedLogs = findByIdAndRemove(logs, payload)

    return toStore(updatedLogs, state)
}
