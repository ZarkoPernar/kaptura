if (process.env.NODE_ENV !== 'production') {
    require('@glimpse/glimpse').init()
}

require('dotenv').config()

import * as express from 'express'
import { Express } from 'express'
const bodyParser = require('body-parser')
const morgan = require('morgan')

const db = require('./db')

const app: Express = express()
const PORT = process.env.PORT || 5000
const PUBLIC_DIR = 'public'

const registerAllRoutes = require('./routes')

app.use(morgan('tiny'))
app.use(express.static(PUBLIC_DIR))
app.use(bodyParser.json())

app.listen(PORT, function(err: Error) {
  if (err) {
    console.error('error starting server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('server listening at http://localhost:' + PORT)
})

registerAllRoutes(app)
