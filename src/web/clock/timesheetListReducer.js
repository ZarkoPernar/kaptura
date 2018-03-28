import createSelector from '../utils/createSelector'
import createStoreList from '../utils/createStoreList'

import { storeItem as rootStoreItem } from './reducer'

import api from './api'

export const storeItem = {
    ...createStoreList('timesheetList', {
        api,
        rootStoreItem,
    }),
    selector: state => state.timesheetList,
    listDataSelector: createSelector(
        'timesheetList',
        rootStoreItem && rootStoreItem.name,
    ),
}

export default storeItem.reducer
