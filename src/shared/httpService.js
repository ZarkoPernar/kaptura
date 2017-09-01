export default {
    get,
    post,
}

export function get(url, requestOptions) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        ...requestOptions,
    })
}

export function post(url, data, requestOptions) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        ...requestOptions,
    })
}

