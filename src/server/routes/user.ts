import * as api from '../api/user'
import { asyncWrap } from './utils'
import API_PREFIX from './prefix'

const ROUTE_PREFIX = API_PREFIX + '/user'

export default function registerRoutes(app) {
    app.get(ROUTE_PREFIX + '/userInfo', asyncWrap(api.userInfo))
    app.post(ROUTE_PREFIX + '/update', asyncWrap(api.update))
}

