import { Observable } from 'rxjs/Observable'

import appStore from '../appStore'
import createStoreList from '../utils/createStoreList'
import createStoreItem from '../utils/createStoreItem'
import api from './api'

import socketService from '../socket'
import { LOAD_USER_INFO_SUCCESS } from '../userInfo.reducer'

export const storeItem = createStoreList('employees', { api })
export const onlineEmployees = createStoreItem('onlineEmployees')


export function employeesEpic(action$) {
    return action$
        .ofType(LOAD_USER_INFO_SUCCESS)
        .map(({ payload }) => ({
            type: storeItem.types.LOAD_LIST_SUCCESS,
            payload: payload.employees
        }))
}


export default storeItem.reducer
