const mongoose = require('mongoose')
require('dotenv').config()
const MOCK_DATA = require('./MOCK_DATA.json')
mongoose.Promise = global.Promise
// mongoose.set('debug', JSON.parse(process.env.MONGO_DEBUG))
mongoose.connect(process.env.MONGO_URL)

module.exports = mongoose.connection

function timestamps(schema, options) {
    schema.add({
        created_by: String,
        updated_at: Date,
        created_at: Date,
        deleted_at: Date,
    })
    schema.pre('save', function(next) {
        this.created_at = this.created_at === undefined ? new Date() : this.created_at
        this.updated_at = new Date()
        next()
    })
}

function location(schema, options) {
    schema.add({
        google_address: String,
        address: String,
        city: String,
        state: String,
        country: String,
        country_code: String,
        latitude: Number,
        longitude: Number,
        position: {
            type: {
                type: String,
                // default: 'Point'
            },
            coordinates: [Number]
        }
    })
}


const ProjectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    number: String,
    client_id: String,
    client_name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    completed: Boolean,
    project_status: Number,
    options: {
        type: Object,
        default: {},
    }
})

ProjectSchema.plugin(timestamps)
ProjectSchema.plugin(location)
ProjectSchema.index({ pos: '2dsphere' })
ProjectSchema.index({ name: 'text' })

ProjectSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
})

const Model = mongoose.model('project', ProjectSchema)

MOCK_DATA
    .map(function(element) {
        return Object.assign({}, element, {
            start_date: new Date(element.start_date),
            end_date: new Date(element.end_date),
            latitude: parseFloat(element.latitude),
            longitude: parseFloat(element.longitude),
            position: {
                type: 'Point',
                coordinates: [parseFloat(element.longitude), parseFloat(element.latitude)]
            }
        })
    })
    .forEach(function(element) {
        new Model(element).save()
    })
