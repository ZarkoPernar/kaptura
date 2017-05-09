const mongoose = require('mongoose')

const { location } = require('./default')

const ProjectSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    start_date: Date,
    end_date: Date,
    description: String,
})

ProjectSchema.plugin(location)
ProjectSchema.index({ pos: '2dsphere' })
ProjectSchema.index({ name: 'text' })

const ProjectModel = mongoose.model('project', ProjectSchema)

module.exports = {
    getItem($id) {
        return ProjectModel.findById($id)
    },

    list(params={}) {
        return ProjectModel.find(params).limit(params.limit || 25)
    },

    create({ lat, lng, name, google_address, description, start_date, end_date }) {
        const user = {
            id: '3123123-hjhkh12312jk3h-31bbjgjg'
        }

        return new ProjectModel({
            name,
            description,
            start_date,
            end_date,
            created_by: user.id,
            created_at: new Date(),
            // pos: {
            //     type: 'Point',
            //     coordinates: [lng, lat]
            // }
        })
        .save()
    },

    update(item) {
        return ProjectModel.findByIdAndUpdate(item)
    },

    remove($id) {
        return ProjectModel.findByIdAndRemove($id)
    },
}

