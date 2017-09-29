import { get, post } from '../shared/apiService'

const base_url = '/client'

export function getById(id) {
    const url = base_url + '/get/' + id
    return get(url)
}

export function list(params) {
    const url = base_url + '/list'
    return post(url, params)
}

export function add(log) {
    const url = base_url + '/create'
    return post(url, log)
}

export function update(log) {
    const url = base_url + '/update'
    return post(url, log)
}

