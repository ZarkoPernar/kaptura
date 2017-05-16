const API_URL = '/api/v1'

export default function http(params) {
    return fetch(API_URL + params.url, {
        credentials: 'include',
        method: params.method,
        body: JSON.stringify(params.body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
    })
    .then(handleJSON)
}

http.get = function(url, options) {
    return http({ url, method: 'GET'})
}

http.post = function(url, body, options) {
    return http({ url, body, method: 'POST'})
}

function handleJSON(res) {
    try {
        const result = res.json()

        if (!res.ok) {
            return result.then(handleJSONErrorResolve)
        }
        return result

    } catch(err) {
        throw err
    }
}

function handleJSONErrorResolve(res) {
    throw res
}
