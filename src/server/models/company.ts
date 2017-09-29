import { IUser } from './user';
import * as mongoose from 'mongoose'

import { location, ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface ICompany extends ITimestampsSchema, ILocationSchema, IModifiedBySchema {
    _id: string
    name: string
    options: Object
}

const CompanySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

CompanySchema.plugin(location)

const Model = mongoose.model('company', CompanySchema)
export default Model
