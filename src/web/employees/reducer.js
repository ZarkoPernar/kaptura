import createStoreList from '../utils/createStoreList'
import api from './api'

import { LOAD_USER_INFO_SUCCESS } from '../userInfo.reducer'

export const storeItem = createStoreList('employees', { api })

export function employeesEpic(action$) {
    return action$
        .ofType(LOAD_USER_INFO_SUCCESS)
        .map(({ payload }) => ({
            type: storeItem.types.LOAD_LIST_SUCCESS,
            payload: payload.employees
        }))
}


export default storeItem.reducer
