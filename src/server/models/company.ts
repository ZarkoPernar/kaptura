import { IUser } from './user';
import * as mongoose from 'mongoose'

import { location, ITimestampsSchema, ILocationSchema, IModifiedBySchema } from './default'

export interface ICompany extends ITimestampsSchema, ILocationSchema, IModifiedBySchema {
    _id: string
    name: string
    company_number?: string
    bank_account?: string
    email?: string
    options: Object
}

const CompanySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    company_number: String,
    bank_account: String,
    email: String,
    options: {
        type: Object,
        default: {},
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

CompanySchema.plugin(location)

export const Model = mongoose.model('company', CompanySchema)

export default {
    getItem(id) {
        return Model.findById(id)
    },
    update({ company, user }) {
        return Model.findById(company._id)
            .then((doc) => {
                Object.assign(doc, company)
                return doc.save()
            })
    }
}
