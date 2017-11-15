import createStoreList from '../utils/createStoreList'

import { storeItem as rootStoreItem } from './itemsReducer'
import api from './invoice_items_api'

export const storeItem = createStoreList('invoice_items_list', { api, rootStoreItem })

export default storeItem.reducer
