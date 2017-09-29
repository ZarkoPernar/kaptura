import { Observable } from 'rxjs/Observable'

import * as apiService from './shared/apiService'

export const LOAD_USER_INFO = 'LOAD_USER_INFO'
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS'
export const LOAD_USER_INFO_ERROR = 'LOAD_USER_INFO_ERROR'

export function userInfoEpic(action$) {
    return action$
        .ofType(LOAD_USER_INFO)
        .mergeMap(() => Observable.fromPromise(
            apiService.get('/user/userInfo')
                .then(payload => ({
                    type: LOAD_USER_INFO_SUCCESS,
                    payload
                }))
        ))
}

export const actions = {
    load() {
        return {
            type: LOAD_USER_INFO
        }
    }
}

export default function userInfoReducer(state={}, { type, payload }) {
    switch(type) {
        case LOAD_USER_INFO_SUCCESS:
            return payload
        default:
            return state
    }
}
