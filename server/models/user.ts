const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

import { ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface IUser {
    _id: string
    email: string
    full_name: string
    username: string
    password: string
    company_id: string
}

export const UserSchema = new Schema({
    company_id: mongoose.Schema.Types.ObjectId,
    email: String,
    full_name: String,
    username: String,
    password: String,
    google: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true,
})

const model = mongoose.model('user', UserSchema)
export default model
