// if (process.env.NODE_ENV !== 'production') {
//     require('@glimpse/glimpse').init()
// }

require('dotenv').config()

import * as express from 'express'
import { Express } from 'express'

import initMiddleware from './middleware/index'
import listen from './listen'
import initDB from './db'
import registerAllRoutes from './routes'
import registerAuthStrategies from './auth'

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 5000

// INIT App
// ==============================================
const app: Express = express()

// Start server
// ==============================================
listen(app, { port: PORT })

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


