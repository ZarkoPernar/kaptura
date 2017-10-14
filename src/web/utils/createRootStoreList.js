import { fromStore, toStoreMerge } from './store.utils'
import { findByIdAndReplace } from './array.utils'
import createListTypes from './createListTypes'

export default function createStoreList(name = required('name'), { api } = {}) {
    const ACTION_TYPES = createListTypes(name)

    return {
        name,
        types: ACTION_TYPES,
        actions: {
            list,
            add,
            update,
        },
        reducer,
    }

    function reducer(state = {}, action) {
        switch (action.type) {
            case ACTION_TYPES.LOAD_LIST:
                return toStoreMerge(action.payload, state)

            case ACTION_TYPES.LOAD_LIST_SUCCESS:
                return toStoreMerge(action.payload, state)

            case ACTION_TYPES.ADD_ITEM:
                return addItemToList(state, action.payload)
            case ACTION_TYPES.ADD_ITEM_SUCCESS:
                return handleUpdate(state, action.payload)

            case ACTION_TYPES.UPDATE_ITEM:
                return handleUpdate(state, action.payload)
            case ACTION_TYPES.UPDATE_ITEM_SUCCESS:
                return handleUpdate(state, action.payload)

            default:
                return state
        }
    }



    // START UTILS
    function addItemToList(state, payload) {
        const logs = fromStore(state)
        const updatedLogs = [payload, ...logs]

        return toStoreMerge(updatedLogs, state)
    }

    function handleUpdate(state, payload) {
        if (state.byId[payload._id] === undefined) return state

        return {
            allIds: state.allIds,
            byId: {
                ...state.byId,
                [payload._id]: payload
            }
        }
    }
    // :: END UTILS

    // START LOAD
    function list(params, offlineList=[]) {
        return dispatch => {
            dispatch(loadListRequest(offlineList))

            if (!api) {
                dispatch(loadListSuccess(offlineList))
            } else {
                return api.list(params)
                    .then(res => {
                        dispatch(loadListSuccess(res))
                    })
                    .catch(err => dispatch(loadListFailure(err)))
            }
        }
    }

    function loadListRequest(payload) {
        return {
            type: ACTION_TYPES.LOAD_LIST,
            payload,
        }
    }

    function loadListSuccess(payload, type=ACTION_TYPES.LOAD_LIST_SUCCESS) {
        return {
            type,
            payload
        }
    }

    function loadListFailure(error) {
        return {
            type: ACTION_TYPES.LOAD_LIST_ERROR,
            error
        }
    }
    // :: END LOAD

    // START ADD
    function add(item) {
        return dispatch => {
            dispatch(addItemRequest(item))

            if (!api) {
                dispatch(addItemSuccess(item))
            } else {
                return api.add(item)
                    .then(res => {
                        dispatch(addItemSuccess(res))
                    })
                    .catch(err => dispatch(addItemFailure(err)))
            }
        }
    }

    function addItemRequest(payload) {
        return {
            type: ACTION_TYPES.ADD_ITEM,
            payload,
        }
    }

    function addItemSuccess(payload, type=ACTION_TYPES.ADD_ITEM_SUCCESS) {
        return {
            type,
            payload
        }
    }

    function addItemFailure(error) {
        return {
            type: ACTION_TYPES.ADD_ITEM_ERROR,
            error
        }
    }
    // :: END ADD

    // START UPDATE
    function update(item) {
        return dispatch => {
            dispatch(updateItemRequest(item))

            if (!api) {
                dispatch(updateItemSuccess(item))
            } else {
                return api.update(item)
                    .then(res => {
                        dispatch(updateItemSuccess(res))
                    })
                    .catch(err => dispatch(updateItemFailure(err)))
            }
        }
    }

    function updateItemRequest(payload) {
        return {
            type: ACTION_TYPES.UPDATE_ITEM,
            payload,
        }
    }

    function updateItemSuccess(payload, type=ACTION_TYPES.UPDATE_ITEM_SUCCESS) {
        return {
            type,
            payload
        }
    }

    function updateItemFailure(error) {
        return {
            type: ACTION_TYPES.UPDATE_ITEM_ERROR,
            error
        }
    }

    // :: END UPDATE
}

function required(name) {
    throw new Error('Argument ' + name + ' is mandatory')
}
