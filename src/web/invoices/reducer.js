import createRootStoreList from '../utils/createRootStoreList'

import api from './api'

export const storeItem = createRootStoreList('invoices', { api })

export default storeItem.reducer
