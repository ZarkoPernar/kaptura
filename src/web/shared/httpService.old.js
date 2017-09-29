const API_URL = '/api/v1'

const NOT_JSON = 'Unexpected token < in JSON at position 0'

let routerInstance

export default function http(params) {
    return fetch(params.url, {
        credentials: 'include',
        method: params.method,
        body: JSON.stringify(params.body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        })
    })
    .then(handleJSON)
    .catch((err) => {
        if (err.message === NOT_JSON) {
            if (routerInstance) {
                routerInstance.history.replace('/login')
            } else {
                location.assign('/login')
            }
        }
        return err
    })
}

http.get = function(partialUrl, options) {
    return http({ url: API_URL + partialUrl, method: 'GET'})
}

http.post = function(partialUrl, body, options) {
    return http({ url: API_URL + partialUrl, body, method: 'POST'})
}

http.noApi = {
    get(url, options) {
        return http({ url, method: 'GET'})
    },
    post(url, body, options) {
        return http({ url, body, method: 'POST'})
    }
}

export function registerRouter(router) {
    routerInstance = router
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
