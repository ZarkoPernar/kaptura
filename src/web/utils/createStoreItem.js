import { fromStore, toStoreMerge } from './store.utils'
import { findByIdAndReplace } from './array.utils'

const SPLIT = '/'

export const LOAD = 'LOAD'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const LOAD_ERROR = 'LOAD_ERROR'

export const UPDATE_ITEM = 'UPDATE_ITEM'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_ERROR = 'UPDATE_ERROR'

const TYPES = [
    LOAD,
    LOAD_SUCCESS,
    LOAD_ERROR,
    UPDATE_ITEM,
    UPDATE_SUCCESS,
    UPDATE_ERROR,
]

export default function createStoreList(name=required('name'), { api, storeItem } = {}) {
    const ACTION_TYPES = TYPES.reduce((types, type) => {
        types[type] = name + SPLIT + type
        return types
    }, {})

    return {
        name,
        types: ACTION_TYPES,
        actions: {
            load,
            update,
        },
        reducer,
    }

    function reducer(state = { loading: false }, action) {
        switch (action.type) {
            case ACTION_TYPES.LOAD:
                return {
                    ...state,
                    loading: true,
                    updating: false,
                }

            case ACTION_TYPES.LOAD_SUCCESS:
                return {
                    ...state,
                    data: action.payload,
                    loading: false,
                }

            case ACTION_TYPES.LOAD_ERROR:
                return {
                    ...state,
                    error: action.error,
                    loading: false,
                }

            case ACTION_TYPES.UPDATE_ITEM:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                    updating: true,
                }

            case ACTION_TYPES.UPDATE_SUCCESS:
                return {
                    ...state,
                    data: {
                        ...state.data,
                        ...action.payload,
                    },
                    updating: false,
                }

            case ACTION_TYPES.UPDATE_ERROR:
                return {
                    ...state,
                    error: action.error,
                    updating: false,
                }

            default:
                return state
        }
    }


    // START LOAD
    function load(params) {
        return dispatch => {
            dispatch(loadRequest(params))

            if (!api) {
                dispatch(loadSuccess(params))
            } else {
                return api.getById(params)
                    .then(res => dispatch(loadSuccess(res)))
                    .catch(err => dispatch(loadFailure(err)))
            }
        }
    }

    function loadRequest(payload) {
        return {
            type: ACTION_TYPES.LOAD,
            payload,
        }
    }

    function loadSuccess(payload) {
        return {
            type: ACTION_TYPES.LOAD_SUCCESS,
            payload
        }
    }

    function loadFailure(error) {
        return {
            type: ACTION_TYPES.LOAD_ERROR,
            error
        }
    }
    // :: END LOAD


    // START UPDATE
    function update(item) {
        return dispatch => {
            dispatch(updateRequest(item))

            if (!api) {
                dispatch(updateSuccess(item))
            } else {
                return api.update(item)
                    .then(res => dispatch(updateSuccess(res)))
                    .catch(err => dispatch(updateFailure(err)))
            }
        }
    }

    function updateRequest(payload) {
        return {
            type: ACTION_TYPES.UPDATE_ITEM,
            payload,
        }
    }

    function updateSuccess(payload) {
        return {
            type: ACTION_TYPES.UPDATE_SUCCESS,
            payload
        }
    }

    function updateFailure(error) {
        return {
            type: ACTION_TYPES.UPDATE_ERROR,
            error
        }
    }

    // :: END UPDATE
}

function required(name) {
    throw new Error('Argument ' + name + ' is mandatory')
}
