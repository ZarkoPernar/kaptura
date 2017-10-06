import { Observable } from 'rxjs/Observable'
import * as apiService from '../shared/apiService'

import { LOAD_USER_INFO, LOAD_USER_INFO_SUCCESS } from '../userInfo.reducer'

const companyInfoInitialState = {
    data: {},
    loading: false,
    updating: false,
}

const UPDATE_COMPANY_INFO = 'UPDATE_COMPANY_INFO'
const UPDATE_COMPANY_INFO_SUCCESS = 'UPDATE_COMPANY_INFO_SUCCESS'
const UPDATE_COMPANY_INFO_ERROR = 'UPDATE_COMPANY_INFO_ERROR'

export function companyEpic(action$) {
    return action$
        .ofType(UPDATE_COMPANY_INFO)
        .mergeMap(({ payload }) => Observable.fromPromise(
            apiService.post('/company/update', payload)
                .then(res => ({
                    type: UPDATE_COMPANY_INFO_SUCCESS,
                    payload: res
                }))
                .catch(err => ({
                    type: UPDATE_COMPANY_INFO_ERROR,
                    error: err
                }))
        ))
}

export default (state = companyInfoInitialState, action) => {
    switch (action.type) {
        case LOAD_USER_INFO:
            return {
                ...state,
                loading: true,
            }
        case LOAD_USER_INFO_SUCCESS:
            return {
                ...state,
                data: action.payload.company,
                loading: false,
            }
        case UPDATE_COMPANY_INFO:
            return {
                ...state,
                data: action.payload,
                updating: true,
            }
        case UPDATE_COMPANY_INFO_SUCCESS:
            return {
                ...state,
                data: action.payload,
                updating: false,
                error: null,
            }
        case UPDATE_COMPANY_INFO_ERROR:
            return {
                ...state,
                data: null,
                updating: false,
                error: action.error,
            }
        default:
            return state
    }
}

export const createUpdateAction = payload => ({
    type: 'UPDATE_COMPANY_INFO',
    payload,
})
