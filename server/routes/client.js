const api = require('../api/client')

const API_PREFIX = require('./prefix')
const ROUTE_PREFIX = API_PREFIX + '/client'

module.exports = function registerRoutes(app) {
    app.get(ROUTE_PREFIX + '/getItem', asyncWrap(api.getItem))
    app.get(ROUTE_PREFIX + '/list', asyncWrap(api.list))
    app.post(ROUTE_PREFIX + '/create', asyncWrap(api.create))
    app.post(ROUTE_PREFIX + '/update', asyncWrap(api.update))
    app.post(ROUTE_PREFIX + '/remove', asyncWrap(api.remove))
}

function asyncWrap(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
