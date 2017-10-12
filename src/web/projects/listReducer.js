import createStoreList from '../utils/createStoreList'

import { storeItem as rootStoreItem } from './reducer'
import api from './api'

export const storeItem = createStoreList('projectList', { api, rootStoreItem })

export default storeItem.reducer
