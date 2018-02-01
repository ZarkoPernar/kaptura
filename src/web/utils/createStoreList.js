import { defaultState } from './store.utils'
import createListTypes from './createListTypes'
import createStoreListReducer from './createStoreListReducer'

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
        reducer: createStoreListReducer(ACTION_TYPES, { defaultState }),
    }

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
