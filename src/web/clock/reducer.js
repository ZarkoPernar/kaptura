import createStoreList from '../utils/createStoreList'

import * as api from './api'
import { storeItem as rootStoreItem } from '../timesheet/reducer'

export const storeItem = createStoreList('clock', { api, rootStoreItem })

export default storeItem.reducer
