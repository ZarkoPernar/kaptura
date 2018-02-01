import { defaultState } from './store.utils'
import createListTypes from './createListTypes'
import createRootStoreListReducer from './createRootStoreListReducer'

export default function createStoreList(name = required('name'), { api } = {}) {
    const ACTION_TYPES = createListTypes(name)

    return {
        name,
        types: ACTION_TYPES,
        actions: {
            list,
            add,
            update,
            loadListRequest,
            loadListSuccess,
            loadListFailure,
            addItemRequest,
            addItemSuccess,
            addItemFailure,
            updateItemRequest,
            updateItemSuccess,
            updateItemFailure,
        },
        reducer: createRootStoreListReducer(ACTION_TYPES, { defaultState }),
    }

    // START LOAD
    function list(params, offlineList=[]) {
        return dispatch => {
            dispatch(loadListRequest(offlineList))

            if (!api) {
                return dispatch(loadListSuccess(offlineList))
            }
            return api.list(params)
                .then(res => dispatch(loadListSuccess(res)))
                .catch(err => dispatch(loadListFailure(err)))
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
                return dispatch(addItemSuccess(item))
            }
            return api.add(item)
                .then(res => dispatch(addItemSuccess(res)))
                .catch(err => dispatch(addItemFailure(err)))
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
                return dispatch(updateItemSuccess(item))
            }
            return api.update(item)
                .then(res => dispatch(updateItemSuccess(res)))
                .catch(err => dispatch(updateItemFailure(err)))
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
