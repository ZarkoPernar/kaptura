import * as apiService from '../shared/apiService'

export function makeCreateApi(base_url, api) {
    return {
        getById(id) {
            const url = base_url + '/get/' + id
            return api.get(url)
        },
        list(params) {
            const url = base_url + '/list'
            return api.post(url, params)
        },
        add(item) {
            const url = base_url + '/create'
            return api.post(url, item)
        },
        update(item) {
            const url = base_url + '/update'
            return api.post(url, item)
        },
        remove(item) {
            const url = base_url + '/remove'
            return api.post(url, item)
        },
    }

}

export default function createApi(base_url) {
    return makeCreateApi(base_url, apiService)
}
