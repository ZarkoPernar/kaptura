import createStoreList from '../utils/createStoreList'
import { storeItem as rootStoreItem } from '../timesheet/reducer'

import * as api from './api'

export const storeItem = createStoreList('timesheetList', { api, rootStoreItem })

export default storeItem.reducer
