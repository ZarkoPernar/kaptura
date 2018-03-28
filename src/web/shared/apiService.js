import http from './httpService'

const URL_PREFIX = '' // TODO:
const API_BASE = '/api'
const API_VERSION = '/v1'
const API_URL = URL_PREFIX + API_BASE + API_VERSION
const DEFAULT_OPTIONS = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

export function get(path) {
    return http
        .get(API_URL + path, DEFAULT_OPTIONS)
        .then(transformToJSON)
        .catch(handleError)
}

export function post(path, data) {
    return http
        .post(API_URL + path, data, DEFAULT_OPTIONS)
        .then(transformToJSON)
        .catch(handleError)
}

function transformToJSON(response) {
    return response.json().catch(err => {
        throw new Error('Response was not a valid JSON string.')
    })
}

function handleError(error) {
    if (error instanceof SyntaxError) {
        console.log(error.message)
    }
    throw error
}
