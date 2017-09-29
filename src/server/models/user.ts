const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

import { ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface IUser {
    _id: string
    email: string
    name: string
    full_name: string
    username: string
    company_id: string
    offlineId?: string
    email_confirmed: boolean
}

export const userSchema = new Schema({
    company_id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    username: String,
    offlineId: String,
    google: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    email_confirmed: {
        type: Boolean,
        default: false,
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

userSchema
    .virtual('name')
    .get(function () {
        return this.full_name
    })


userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true,
})

const model = mongoose.model('user', userSchema)
export default model
