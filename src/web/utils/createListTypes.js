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

export const REMOVE_ITEM = 'REMOVE_ITEM'
export const REMOVE_ITEM_SUCCESS = 'REMOVE_ITEM_SUCCESS'
export const REMOVE_ITEM_ERROR = 'REMOVE_ITEM_ERROR'

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
    REMOVE_ITEM,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_ERROR,
]

export default function createTypes(name) {
    return TYPES.reduce((types, type) => {
        return Object.assign(types, { [type]: name + SPLIT + type })
    }, {})
}
