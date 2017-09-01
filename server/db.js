const mongoose = require('mongoose')
import { modifiedBy } from './models/default'

mongoose.Promise = global.Promise
mongoose.set('debug', JSON.parse(process.env.MONGO_DEBUG))
mongoose.connect(process.env.MONGO_URL)

mongoose.plugin(modifiedBy)

module.exports = mongoose.connection
