import * as mongoose from 'mongoose'

import { IUser } from './user'
import { location, ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface IClient extends ITimestampsSchema, ILocationSchema, IModifiedBySchema {
    _id: string
    company_id: string
    name: string
    company_number: string
    account_number?: string
    notes?: string
    offlineId?: string
    options: Object
}

const ClientSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    company_id: mongoose.Schema.Types.ObjectId,
    company_number: String,
    account_number: String,
    notes: String,
    offlineId: String,
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

ClientSchema.plugin(location)
ClientSchema.index({ pos: '2dsphere' })
ClientSchema.index({ name: 'text' })

export const Model = mongoose.model('client', ClientSchema)

const UPDATE_OPTIONS = { new: true }

export default {
    getItem($id, user) {
        return Model.findById($id)
            .where('company_id')
            .equals(user.company_id)
    },

    create({ item, user, offlineId }: { item: IClient, user: IUser, offlineId?: string }) {
        let newItem = {
            ...item,
            offlineId,
            created_by: user._id,
            company_id: user.company_id,
        }

        return new Model(newItem).save()
    },

    update({ item, user }: { item: IClient, user: IUser }) {
        return Model.findById(item._id)
            .where('company_id')
            .equals(user.company_id)
            .then((doc) => {
                if (doc === null) return
                Object.assign(doc, item)

                return doc.save()
            })
    },

    remove({ item, user }: { item: IClient, user: IUser }) {
        return Model.findByIdAndRemove(item._id)
            .where('company_id')
            .equals(user.company_id)
    },
}

