const mongoose = require('mongoose')
import { modifiedBy } from './models/default'

mongoose.Promise = global.Promise
mongoose.set('debug', JSON.parse(process.env.MONGO_DEBUG))
mongoose.plugin(modifiedBy)


export default function init(mongoUrl: string) {
    return mongoose.connect(mongoUrl)
}
