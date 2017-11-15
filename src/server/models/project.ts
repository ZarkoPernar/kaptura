import * as mongoose from 'mongoose'
const { promisify } = require('util')

import { IUser } from './user'
import { location, ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface IProject extends ITimestampsSchema, ILocationSchema, IModifiedBySchema {
    _id: string
    name: string
    company_id: string,
    number?: string
    client_id?: string
    client_name?: string
    description?: string
    start_date: string
    end_date?: string
    completed: boolean
    status: number
    offlineId?: string
    options: Object
}

const UPDATE_OPTIONS = { new: true }

const ProjectStatusSchema = new mongoose.Schema({
    value: Number,
    label: String,
})
const ProjectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    number: String,
    company_id: mongoose.Schema.Types.ObjectId,
    client_id: mongoose.Schema.Types.ObjectId,
    client_name: String,
    description: String,
    start_date: Date,
    end_date: Date,
    completed: Boolean,
    status: {
        type: ProjectStatusSchema,
        default: {
            value: 0,
            label: 'Stvoreno',
        },
    },
    offlineId: String,
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ProjectSchema.plugin(location)
ProjectSchema.index({ pos: '2dsphere' })
ProjectSchema.index({ name: 'text' })

ProjectSchema.post('save', function (error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next(error);
    }
})

export const Model = mongoose.model('project', ProjectSchema)


export default {
    getItem($id, user) {
        return Model.findById($id)
            .where('company_id')
            .equals(user.company_id)
    },

    create({ item, user, offlineId }: { item: IProject, user: IUser, offlineId?: string }) {
        let newItem = {
            ...item,
            offlineId,
            created_by: user._id,
            company_id: user.company_id,
        }

        return new Model(newItem).save()
    },

    update({ item, user }: { item: IProject, user: IUser }) {
        return Model.findById(item._id)
            .where('company_id')
            .equals(user.company_id)
            .then((doc) => {
                if (doc === null) return
                Object.assign(doc, item)

                return doc.save()
            })
    },

    remove({ item, user }: { item: IProject, user: IUser }) {
        return Model.findByIdAndRemove(item._id)
            .where('company_id')
            .equals(user.company_id)
    },
}

