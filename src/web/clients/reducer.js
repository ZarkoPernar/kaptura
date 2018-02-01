import { createStoreList } from 'redux-store-list'
import { combineEpics } from 'redux-observable'
// import createStoreList from '../utils/createStoreList'

import api from './api'

const list = createStoreList('clients', { api, getEntityId: '_id' })
export const storeItem = {
    ...list,
    actions: {
        ...list.actionCreators,
        list: list.actionCreators.loadList,
    },
}

export const clientEpic = storeItem.epic

export default storeItem.reducer

console.log(storeItem)
