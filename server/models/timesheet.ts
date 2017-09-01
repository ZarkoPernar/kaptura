import { IUser } from './user';
import * as mongoose from 'mongoose'

import { location, ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface ITimesheet extends ITimestampsSchema, IModifiedBySchema {
    _id: string
    company_id: string,
    user_id: string,
    project_id?: string,
    project_name?: string,
    project_number?: string,
    client_id?: string
    client_name?: string
    description?: string
    check_in?: string
    check_out?: string
}

const UPDATE_OPTIONS = { new: true }

const TimesheetSchema = new mongoose.Schema({
    company_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    project_id: mongoose.Schema.Types.ObjectId,
    project_name: String,
    project_number: String,
    client_id: mongoose.Schema.Types.ObjectId,
    client_name: String,
    description: String,
    check_in: Date,
    check_out: Date,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// TimesheetSchema.plugin(location)
// TimesheetSchema.index({ pos: '2dsphere' })
// TimesheetSchema.index({ name: 'text' })

TimesheetSchema.post('save', function (error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next(error);
    }
})

export const Model = mongoose.model('timesheet', TimesheetSchema)


export default {
    getItem($id, user) {
        return Model.findById($id)
            .where('company_id')
            .equals(user.company_id)
    },

    create({ item, user }: { item: ITimesheet, user: IUser }) {
        let newItem = {
            ...item,
            created_by: user._id,
            company_id: user.company_id,
        }

        // if (item.latitude && item.longitude) {
        //     newItem.position = {
        //         type: 'Point',
        //         coordinates: [item.longitude, item.latitude]
        //     }
        // }

        return new Model(newItem).save()
    },

    update({ item, user }: { item: ITimesheet, user: IUser }) {
        return Model.findByIdAndUpdate(item._id, { $set: item }, UPDATE_OPTIONS)
            .where('company_id')
            .equals(user.company_id)
    },

    remove({ item, user }: { item: ITimesheet, user: IUser }) {
        return Model.findByIdAndRemove(item._id)
            .where('company_id')
            .equals(user.company_id)
    },
}

