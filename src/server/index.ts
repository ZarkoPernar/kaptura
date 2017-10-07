// Get environment variables
// ==============================================
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000


import * as express from 'express'
import { Express } from 'express'
const app: Express = express()
export const http = require('http').Server(app)


import initMiddleware from './middleware'
import './socket'
import listen from './listen'
import initDB from './db'
import registerAllRoutes from './routes'
import registerAuthStrategies from './auth'


// INIT App
// ==============================================


// Start server
// ==============================================
listen(app, http, { port: PORT })

// Connect MongoDB
// ==============================================
initDB(MONGO_URL)


// Init express session, mongo session, logging etc.
// ==============================================
initMiddleware(app)


// Init auth strategies LocalStrategy, googleAuthStrategy
// ==============================================
registerAuthStrategies(app)


// Init all routes
// ==============================================
registerAllRoutes(app)


