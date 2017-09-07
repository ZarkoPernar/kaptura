
const SPLIT = '/'

export const LOAD_LIST = 'LOAD_LIST'
export const LOAD_LIST_SUCCESS = 'LOAD_LIST_SUCCESS'
export const LOAD_LIST_ERROR = 'LOAD_LIST_ERROR'

export const ADD_ITEM = 'ADD_ITEM'
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS'
export const ADD_ITEM_ERROR = 'ADD_ITEM_ERROR'

export const EDIT_ITEM = 'EDIT_ITEM'
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS'
export const EDIT_ITEM_ERROR = 'EDIT_ITEM_ERROR'

const TYPES = [
    LOAD_LIST,
    LOAD_LIST_SUCCESS,
    LOAD_LIST_ERROR,
    ADD_ITEM,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_ERROR,
    EDIT_ITEM,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_ERROR,
]

export function createStoreItem(name=required('name'), initialState) {
    const ACTION_TYPES = TYPES.reduce((types, type) => {
        types[type] = name + SPLIT + type
        return types
    }, {})

    return {
        actions: {
            loadList,
            addItem,
            editItem,
            removeItem,
        },
        reducer,
    }

    function reducer(state = initialState, action) {
        switch (action.type) {
            // case ACTION_TYPE_1:
            //     return state
            // case ACTION_TYPE_2:
            //     return state
            default:
                return state
        }
    }

    function loadList(payload) {
        return {
            type: ACTION_TYPES.LOAD_LIST,
            payload,
        }
    }

    function addItem(payload) {
        return {
            type: ACTION_TYPES.ADD_ITEM,
            payload,
        }
    }

    function editItem(payload) {
        return {
            type: ACTION_TYPES.EDIT_ITEM,
            payload,
        }
    }

    function removeItem(payload) {
        return {
            type: ACTION_TYPES.REMOVE_ITEM,
            payload,
        }
    }

}

function required(name) {
    throw new Error('Argument ' + name + ' is mandatory')
}
