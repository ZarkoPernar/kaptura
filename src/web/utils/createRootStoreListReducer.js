import { fromStore, toStoreMerge } from './store.utils'

function addItemToList(state, payload) {
    const logs = fromStore(state)
    const updatedLogs = [payload, ...logs]

    return toStoreMerge(updatedLogs, state)
}

function handleUpdate(state, payload, idPropName = '_id') {
    if (state.byId[payload._id] === undefined) return state

    return {
        allIds: state.allIds,
        byId: {
            ...state.byId,
            [payload[idPropName]]: payload
        }
    }
}

export default function createRootStoreListReducer(types, { defaultState }) {
    return function reducer(state = defaultState, action) {
        switch (action.type) {
            case types.LOAD_LIST:
                return toStoreMerge(action.payload, state)

            case types.LOAD_LIST_SUCCESS:
                return toStoreMerge(action.payload, state)

            case types.ADD_ITEM:
                return addItemToList(state, action.payload)
            case types.ADD_ITEM_SUCCESS:
                // REVIEW: might cause issues bc both offline version
                // and the item in the db will exist inth root store list
                return addItemToList(state, action.payload)

            case types.UPDATE_ITEM:
                return handleUpdate(state, action.payload)
            case types.UPDATE_ITEM_SUCCESS:
                return handleUpdate(state, action.payload)

            default:
                return state
        }
    }
}
