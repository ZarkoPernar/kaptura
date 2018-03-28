import { createStoreList } from 'redux-store-list'
import { createEpic } from 'redux-store-list/epic'
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

export const clientEpic = createEpic(storeItem, api)

export default storeItem.reducer
