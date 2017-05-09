const mongoose = require('mongoose')

const { timestamps } = require('./models/default')

mongoose.Promise = global.Promise
mongoose.set('debug', JSON.parse(process.env.MONGO_DEBUG))
mongoose.connect(process.env.MONGO_URL)

mongoose.plugin(timestamps)

module.exports = mongoose.connection
