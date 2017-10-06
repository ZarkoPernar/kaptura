import * as mongoose from 'mongoose'

import { IUser } from './user'
import { ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface IApiLog {
    company_id: string
    user_id: string
    user_name: string
    api: string         // project
    api_action: string  // list
    method: string        // POST
    full_url: string    // /api/project/list
    payload?: any       // { filters: { created_by: { comparator: '=', value 837 }}}
    error?: any         // MongooseValidationError
    system_note?: string  // Create project failed
}

const ApiLogSchema = new mongoose.Schema({
    company_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    user_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
    user_name: {
        required: true,
        type: String
    },
    api: {
        required: true,
        type: String
    },
    api_action: {
        required: true,
        type: String
    },
    method: {
        required: true,
        type: String
    },
    full_url: {
        required: true,
        type: String
    },
    payload: Object,
    error: Object,
    system_note: String,
})

// export interface INewApiLog extends Partial<IApiLog> { }

export interface ICreateApiPayload {
    apiRequest: any,
    user: IUser
}

export const Model = mongoose.model('api_logs', ApiLogSchema)

const UPDATE_OPTIONS = { new: true }

export default {
    getItem($id, user) {
        return Model.findById($id)
    },

    list(): mongoose.DocumentQuery<any[], any> {
        return Model.find()
            .limit(100)
    },

    create({ apiRequest, user }: ICreateApiPayload): Promise<mongoose.Document> {
        let newItem: IApiLog = {
            user_id: user._id,
            user_name: user.full_name,
            company_id: user.company_id,
            method: apiRequest.method,
            api: apiRequest.api,
            api_action: apiRequest.api_action,
            full_url: apiRequest.full_url,
        }

        return new Model(newItem).save()
    },
}

