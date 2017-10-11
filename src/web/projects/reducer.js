import 'rxjs/add/observable/fromEvent'

import createRootStoreList from '../utils/createRootStoreList'


import * as api from './api'

export const storeItem = createRootStoreList('projects', { api })

export default storeItem.reducer
