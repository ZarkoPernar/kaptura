import createStoreList from '../utils/createStoreList'

import api from './api'
import { storeItem as rootStoreItem } from '../timesheet/reducer'

export const storeItem = createStoreList('clock', { api, rootStoreItem })

export default storeItem.reducer
