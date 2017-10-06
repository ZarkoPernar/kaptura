import * as url from 'url'

import { IRequest } from '../routes/request.interface'
import ApiLog from '../models/apiLog'

export default function apiLogging(request: IRequest, response: Response, next) {
    const fullUrl = url.parse(request.url, true)
    const fullApi = fullUrl.path ? fullUrl.path.substring(8) : ''
    const apiUrlComponents = fullApi.split('/')

    ApiLog.create({
        user: request.user,
        apiRequest: {
            method: request.method,
            payload: request.body,
            full_url: fullUrl.path,
            api: apiUrlComponents[0],
            api_action: apiUrlComponents[1],
        }
    })
    .then(console.log)
    .catch(console.log)
    next()
}
