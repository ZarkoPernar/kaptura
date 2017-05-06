const express = require('express')

const app = express()

// Pass the express module to nwb's middleware
app.use(require('nwb/express')(express))

app.listen(3000, function(err) {
  if (err) {
    console.error('error starting server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('server listening at http://localhost:3000')
})

app.get('/api/lol', (req, res) => {
    res.json('LoL')
})
