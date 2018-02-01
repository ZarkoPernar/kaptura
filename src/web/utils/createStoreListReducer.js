import {
    fromStore,
    toStore,
    unshiftStoreList,
    updateStoreList,
    removeItemInStoreList
} from './store.utils'

export default function createStoreListReducer(types, { defaultState }) {

    return function reducer(state = defaultState, action) {
        switch (action.type) {
            case types.LOAD_LIST:
                return {
                    ...state, //toStore(action.payload, state)
                    loading: true,
                    error: null,
                }

            case types.LOAD_LIST_SUCCESS:
                return {
                    ...toStore(action.payload, state),
                    loading: false,
                    error: null,
                }

            case types.LOAD_LIST_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.error,
                }

            case types.ADD_ITEM:
                return unshiftStoreList(state, action.payload)
            case types.ADD_ITEM_SUCCESS:
                return updateStoreList(state, action.payload, 'offlineId')

            case types.UPDATE_ITEM:
                return updateStoreList(state, action.payload)
            case types.UPDATE_ITEM_SUCCESS:
                return updateStoreList(state, action.payload)

            case types.REMOVE_ITEM:
                return removeItemInStoreList(state, action.payload)
            case types.REMOVE_ITEM_SUCCESS:
                return removeItemInStoreList(state, action.payload)

            default:
                return state
        }
    }
}
