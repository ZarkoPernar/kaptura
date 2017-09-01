import * as mongoose from 'mongoose'

import { location, ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface IClient extends ITimestampsSchema, ILocationSchema, IModifiedBySchema {
    _id: string
    name: string
    account_number?: string
    client_id?: string
    notes?: string
}

const ClientSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    account_number: String,
    company_id: mongoose.Schema.Types.ObjectId,
    notes: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ClientSchema.plugin(location)
ClientSchema.index({ pos: '2dsphere' })
ClientSchema.index({ name: 'text' })

const ClientModel = mongoose.model('client', ClientSchema)

export default {

}

