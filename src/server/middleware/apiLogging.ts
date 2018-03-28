import * as url from 'url'

import { IRequest } from '../routes/request.interface'
import ApiLog from '../models/apiLog'

const GET_METHOD = 'GET'
const LIST_ACTION = 'list'

export default function apiLogging(
    request: IRequest,
    response: Response,
    next,
) {
    const fullUrl = url.parse(request.url, true)
    const fullApi = fullUrl.path ? fullUrl.path.substring(8) : ''
    const apiUrlComponents = fullApi.split('/')
    const api_action = apiUrlComponents[apiUrlComponents.length - 1]

    if (api_action === LIST_ACTION || request.method === GET_METHOD) {
        return next()
    }

    ApiLog.create({
        user: request.user,
        apiRequest: {
            method: request.method,
            body: request.body,
            full_url: fullUrl.path,
            api: apiUrlComponents[0],
            api_action,
        },
    })
        .then(console.log)
        .catch(console.log)
    next()
}
