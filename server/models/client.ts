import * as mongoose from 'mongoose'

import { location, timestamps } from './default'

export interface IClient {
    _id: string
    name: string
    account_number?: string
    client_id?: string
    notes?: string
    lat?: string
    lng?: string
    google_address?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zip?: string
}

const ClientSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    account_number: String,
    client_id: String,
    notes: String,
    lat: String,
    lng: String,
    google_address: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zip: String,
})

ClientSchema.plugin(location)
ClientSchema.plugin(timestamps)
ClientSchema.index({ pos: '2dsphere' })
ClientSchema.index({ name: 'text' })

const ClientModel = mongoose.model('project', ClientSchema)

export default {
    getItem($id) {
        return ClientModel.findById($id)
    },

    list(params={}) {
        return ClientModel.find(params).sort({
            created_at: -1,
        })
    },

    create({ lat, lng, name, google_address, notes, account_number }: IClient) {
        const user = {
            id: '3123123-hjhkh12312jk3h-31bbjgjg'
        }

        return new ClientModel({
            name,
            notes,
            account_number,
            created_by: user.id,
            // pos: {
            //     type: 'Point',
            //     coordinates: [lng, lat]
            // }
        })
        .save()
    },

    update(item: IClient) {
        return ClientModel.findByIdAndUpdate(item._id, { $set: item })
    },

    remove($id: string) {
        return ClientModel.findByIdAndRemove($id)
    },
}

