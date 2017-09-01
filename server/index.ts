// if (process.env.NODE_ENV !== 'production') {
//     require('@glimpse/glimpse').init()
// }

require('dotenv').config()

import * as express from 'express'
import { Express } from 'express'

const passport = require('passport')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(expressSession)

const db = require('./db')

import UserModel from './models/user'

const app: Express = express()
const PORT = process.env.PORT || 5000
const PUBLIC_DIR = 'public'

import registerAllRoutes from './routes'
import registerAuthStrategies from './auth'

const store = new MongoDBStore(
    {
        uri: 'mongodb://localhost:27017/kaptura',
        collection: 'mySessions'
    }
)

app.use(logger('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
    // MongoDBStore
    store,

    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, listenCb)

registerAuthStrategies(app)
registerAllRoutes(app)

function listenCb(err: Error) {
  if (err) {
    console.error('error starting server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('server listening at http://localhost:' + PORT)
}
