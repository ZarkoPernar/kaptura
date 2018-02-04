import * as api from '../api/inventory.item'
import { asyncWrap } from './utils'
import API_PREFIX from './prefix'

const ROUTE_PREFIX = API_PREFIX + '/inventory/item'

export default function registerRoutes(app) {
    app.get(ROUTE_PREFIX + '/getItem/:id', asyncWrap(api.getItem))
    app.post(ROUTE_PREFIX + '/list', asyncWrap(api.list))
    app.post(ROUTE_PREFIX + '/create', asyncWrap(api.create))
    app.post(ROUTE_PREFIX + '/update', asyncWrap(api.update))
    app.post(ROUTE_PREFIX + '/remove', asyncWrap(api.remove))
}
