import createRootStoreList from '../utils/createRootStoreList'

import * as api from '../clock/api'

export const storeItem = createRootStoreList('timesheet', { api })

export default storeItem.reducer
