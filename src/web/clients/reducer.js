import createStoreList from '../utils/createStoreList'

import api from './api'

export const storeItem = createStoreList('clients', { api })

export default storeItem.reducer
