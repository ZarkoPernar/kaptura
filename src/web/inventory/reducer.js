import { createStoreList } from 'redux-store-list'
import { createEpic } from 'redux-store-list/epic'

import createApi from '../utils/createApi'

const api = createApi('/inventory/item')

export const inventoryStoreList = createStoreList('inventory', {
    getEntityId: '_id',
})

export const inventoryFavoritesStoreList = createStoreList('inventoryFavorites')

export const inventoryEpic = createEpic(inventoryStoreList, {
    ...api,
    loadList: api.list,
})
