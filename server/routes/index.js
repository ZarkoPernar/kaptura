const projectRoutes = require('./project')

module.exports = function registerRoutes(app) {
    projectRoutes(app)
}
