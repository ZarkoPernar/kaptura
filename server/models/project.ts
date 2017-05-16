import * as mongoose from 'mongoose'

import { location, timestamps } from './default'

export interface IProject {
    _id: string
    name: string
    number?: string
    client_id?: string
    client_name?: string
    description?: string
    lat?: string
    lng?: string
    google_address?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zip?: string
    start_date?: string
    end_date?: string
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
    lat: String,
    lng: String,
    google_address: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    start_date: Date,
    end_date: Date,
})

ProjectSchema.plugin(location)
ProjectSchema.plugin(timestamps)
ProjectSchema.index({ pos: '2dsphere' })
ProjectSchema.index({ name: 'text' })

ProjectSchema.post('save', function(error: any, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
})

const ProjectModel = mongoose.model('project', ProjectSchema)

export default {
    getItem($id) {
        return ProjectModel.findById($id)
    },

    list(params={}) {
        return ProjectModel.find(params).sort({
            created_at: -1,
        })
    },

    create({ lat, lng, name, google_address, description, start_date, end_date }: IProject) {
        const user = {
            id: '3123123-hjhkh12312jk3h-31bbjgjg'
        }

        return new ProjectModel({
            name,
            description,
            start_date,
            end_date,
            created_by: user.id,
            // pos: {
            //     type: 'Point',
            //     coordinates: [lng, lat]
            // }
        })
        .save()
    },

    update(item: IProject) {
        return ProjectModel.findByIdAndUpdate(item._id, { $set: item })
    },

    remove($id: string) {
        return ProjectModel.findByIdAndRemove($id).then(() => {
            return {
                message: 'Successufully removed project'
            }
        })
    },
}

