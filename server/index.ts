require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db')

const app = express()
const PORT = process.env.PORT || 5000
const PUBLIC_DIR = 'public'

const registerAllRoutes = require('./routes')

app.use(express.static(PUBLIC_DIR))
app.use(bodyParser.json())

app.listen(PORT, function(err) {
  if (err) {
    console.error('error starting server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('server listening at http://localhost:' + PORT)
})

registerAllRoutes(app)
