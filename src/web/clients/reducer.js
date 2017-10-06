import createStoreList from '../utils/createStoreList'

import * as api from './api'

export const storeItem = createStoreList('clients', { api })

export default storeItem.reducer
