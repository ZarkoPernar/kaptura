import { createStoreList } from 'redux-store-list'
import createApi from '../utils/createApi'

const api = createApi('/inventory/item')

export const inventoryStoreList = createStoreList('inventory', {
    api: {
        ...api,
        loadList: api.list,
    },
    getEntityId: '_id',
})
export const inventoryFavoritesStoreList = createStoreList('inventoryFavorites')
