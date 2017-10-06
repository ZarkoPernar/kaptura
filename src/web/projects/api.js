import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { get, post } from '../shared/apiService'
// import { mapCollection, createWatchCollection, getDataFromDocument } from '../utils/firebase'
// import firebase, { db } from '../firebase'
// const projects = db.collection('projects')

const base_url = '/project'
const CHANGE_MODIFIED = 'modified'


export function getById(id) {
    const url = base_url + '/get/' + id
    return get(url)
}

export function list(params) {
    return post(base_url + '/list', params)

    // return projects.get()
    //     .then(mapCollection)
    //     .catch(function (error) {
    //         throw new Error("Error getting documents: ", error);
    //     });
}

export function watch() {
    return Observable.of([])
    // return createWatchCollection(projects)
    //     .filter(change => change.type === CHANGE_MODIFIED)
    //     .map(change => change.doc)
    //     .map(getDataFromDocument)
}

export function add(log) {
    const url = base_url + '/create'
    return post(url, log)
}

export function update(log) {
    const url = base_url + '/update'
    return post(url, log)
}

