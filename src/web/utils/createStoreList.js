import { fromStore, toStore } from './store.utils'
import { findByIdAndReplace } from './array.utils'

const SPLIT = '/'

export const LOAD_LIST = 'LOAD_LIST'
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS'
export const LOAD_LIST_ERROR = 'LOAD_LIST_ERROR'

export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR'

export const UPDATE_ITEM = 'UPDATE_ITEM'
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS'
export const UPDATE_ITEM_ERROR = 'UPDATE_ITEM_ERROR'

const TYPES = [
    LOAD_LIST,
    LOAD_LIST_SUCCESS,
    LOAD_LIST_ERROR,
    ADD_ITEM,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_ERROR,
    UPDATE_ITEM,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_ERROR,
]

export default function createStoreList(name = required('name'), { api, rootStoreItem } = {}) {
    const ACTION_TYPES = TYPES.reduce((types, type) => {
        types[type] = name + SPLIT + type
        return types
    }, {})

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
                return updateItemInList(state, action.payload)

            case ACTION_TYPES.UPDATE_ITEM:
                return updateItemInList(state, action.payload)
            case ACTION_TYPES.UPDATE_ITEM_SUCCESS:
                return updateItemInList(state, action.payload)

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

    function updateItemInList(state, payload) {
        const logs = fromStore(state)

        const updatedLogs = findByIdAndReplace(logs, payload)

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

    // :: END UPDATE
}

function required(name) {
    throw new Error('Argument ' + name + ' is mandatory')
}
