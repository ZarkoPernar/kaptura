// Get environment variables
// ==============================================
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000


import * as express from 'express'
import { Express } from 'express'

import initMiddleware from './middleware'
import listen from './listen'
import socket from './socket'
import initDB from './db'
import registerAllRoutes from './routes'
import registerAuthStrategies from './auth'


// INIT App
// ==============================================
const app: Express = express()
const http = require('http').Server(app)
export const io = require('socket.io')(http)

// Start server
// ==============================================
listen(app, http, { port: PORT })

// Start socket
// ==============================================
socket({ io })

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


