import { fromStore, toStore } from './store.utils'
import { findByIdAndReplace, findByIdAndRemove } from './array.utils'
import createListTypes from './createListTypes'

const defaultState = {
    byId: {},
    allIds: [],
}

export default function createStoreList(name = required('name'), { api, rootStoreItem } = {}) {
    const ACTION_TYPES = createListTypes(name)

    return {
        name,
        types: ACTION_TYPES,
        actions: {
            list,
            add,
            update,
            remove,
        },
        reducer,
    }

    function reducer(state = defaultState, action) {
        switch (action.type) {
            case ACTION_TYPES.LOAD_LIST:
                return {
                    ...state, //toStore(action.payload, state)
                    loading: true,
                    error: null,
                }

            case ACTION_TYPES.LOAD_LIST_SUCCESS:
                return {
                    ...toStore(action.payload, state),
                    loading: false,
                    error: null,
                }

            case ACTION_TYPES.LOAD_LIST_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.error,
                }

            case ACTION_TYPES.ADD_ITEM:
                return addItemToList(state, action.payload)
            case ACTION_TYPES.ADD_ITEM_SUCCESS:
                return handleUpdate(state, action.payload)

            case ACTION_TYPES.UPDATE_ITEM:
                return handleUpdate(state, action.payload)
            case ACTION_TYPES.UPDATE_ITEM_SUCCESS:
                return handleUpdate(state, action.payload)

            case ACTION_TYPES.REMOVE_ITEM:
                return removeItemInList(state, action.payload)
            case ACTION_TYPES.REMOVE_ITEM_SUCCESS:
                return removeItemInList(state, action.payload)

            default:
                return state
        }
    }



    // START UTILS
    function addItemToList(state, payload) {
        const logs = fromStore(state)
        const updatedLogs = [payload, ...logs]

        return toStore(updatedLogs, state)
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

    function removeItemInList(state, payload) {
        const logs = fromStore(state)

        const updatedLogs = findByIdAndRemove(logs, payload)

        return toStore(updatedLogs, state)
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
                        if (rootStoreItem) {
                            dispatch(loadListSuccess(res, rootStoreItem.types.LOAD_LIST_SUCCESS))
                        }
                        return dispatch(loadListSuccess(res))
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
            if (rootStoreItem) {
                dispatch(addItemRequest(item, rootStoreItem.types.ADD_ITEM))
            }
            dispatch(addItemRequest(item))

            if (!api) {
                dispatch(addItemSuccess(item))
            } else {
                return api.add(item)
                    .then(res => {
                        if (rootStoreItem) {
                            dispatch(addItemSuccess(res, rootStoreItem.types.ADD_ITEM_SUCCESS))
                        }
                        return dispatch(addItemSuccess(res))
                    })
                    .catch(err => dispatch(addItemFailure(err)))
            }
        }
    }

    function addItemRequest(payload, type=ACTION_TYPES.ADD_ITEM) {
        return {
            type,
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
            if (rootStoreItem) {
                dispatch(updateItemRequest(item, rootStoreItem.types.UPDATE_ITEM))
            }
            dispatch(updateItemRequest(item))

            if (!api) {
                dispatch(updateItemSuccess(item))
            } else {
                return api.update(item)
                    .then(res => {
                        if (rootStoreItem) {
                            dispatch(updateItemSuccess(res, rootStoreItem.types.UPDATE_ITEM_SUCCESS))
                        }
                        return dispatch(updateItemSuccess(res))
                    })
                    .catch(err => dispatch(updateItemFailure(err)))
            }
        }
    }

    function updateItemRequest(payload, type=ACTION_TYPES.UPDATE_ITEM_SUCCESS) {
        return {
            type,
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

    // START REMOVE
    function remove(item) {
        return dispatch => {
            if (rootStoreItem) {
                dispatch(removeItemRequest(item, rootStoreItem.types.REMOVE_ITEM))
            }
            dispatch(removeItemRequest(item))

            if (!api) {
                dispatch(removeItemSuccess(item))
            } else {
                return api.remove(item)
                    .then(res => {
                        if (rootStoreItem) {
                            dispatch(removeItemSuccess(res, rootStoreItem.types.REMOVE_ITEM_SUCCESS))
                        }
                        return dispatch(removeItemSuccess(res))
                    })
                    .catch(err => dispatch(removeItemFailure(err)))
            }
        }
    }

    function removeItemRequest(payload, type = ACTION_TYPES.REMOVE_ITEM_SUCCESS) {
        return {
            type,
            payload,
        }
    }

    function removeItemSuccess(payload, type = ACTION_TYPES.REMOVE_ITEM_SUCCESS) {
        return {
            type,
            payload
        }
    }

    function removeItemFailure(error) {
        return {
            type: ACTION_TYPES.REMOVE_ITEM_ERROR,
            error
        }
    }

    // :: END REMOVE
}

function required(name) {
    throw new Error('Argument ' + name + ' is mandatory')
}
