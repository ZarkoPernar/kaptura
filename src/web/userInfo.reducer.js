import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/combineLatest'

import * as apiService from './shared/apiService'
import socket, { connection } from './socket'

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

export function socketUserEpic(action$) {
    const action = action$
        .ofType(LOAD_USER_INFO_SUCCESS)
    return Observable.combineLatest([action, connection])
        .filter(([_, connected]) => connected)
        .map(([data]) => data.payload)
        .map((payload) => {
            socket.emit('add user', payload.user)
            return {
                type: 'SOCKET_ADD_USER_REQUEST'
            }
        })
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
