import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'

import createRootStoreList from '../utils/createRootStoreList'
import socket from '../socket'
import appStore from '../appStore'
import * as api from './api'

export const storeItem = createRootStoreList('projects', { api })

// api.watch().subscribe((val) => {
//     appStore.dispatch({
//         type: storeItem.types.UPDATE_ITEM_SUCCESS,
//         payload: val
//     })
// })

Observable.fromEvent(socket, 'project_create')
    .subscribe(payload => {
        console.log('project_create', payload)
        appStore.dispatch({
            type: storeItem.types.UPDATE_ITEM_SUCCESS,
            payload
        })
    })

Observable.fromEvent(socket, 'project_update')
    .subscribe(payload => {
        console.log('project_update', payload)
        appStore.dispatch({
            type: storeItem.types.UPDATE_ITEM_SUCCESS,
            payload
        })
    })


export default storeItem.reducer
