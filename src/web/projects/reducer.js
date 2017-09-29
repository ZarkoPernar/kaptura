import createStoreItem from '../utils/createStoreItem'

import * as api from './api'

export const storeItem = createStoreItem('projects', { api })

export default storeItem.reducer
