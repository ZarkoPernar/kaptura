import createRootStoreList from '../utils/createRootStoreList'

import api from './invoice_items_api'

export const storeItem = createRootStoreList('invoice_items', { api })

export default storeItem.reducer
