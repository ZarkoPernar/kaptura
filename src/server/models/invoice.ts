import * as mongoose from 'mongoose'
const { promisify } = require('util')

import { IUser } from './user'
import { location, ITimestampsSchema, IModifiedBySchema } from './default'

export interface IInvoice extends ITimestampsSchema, IModifiedBySchema {
    _id: string
    company_id: string
    project_id: string
    client_id: string
    number: string
    due_date: Date
    issue_date: Date
    project: {
        name: string
        address: string
        number: string
    }
    client: {
        name: string
        address: string
        number: string
        bank_number: string
    }
    company: {
        name: string
        address: string
        number: string
        bank_number: string
    }
    issued_by: {
        name: string
        user_id: string
    }
    description?: string
    issued: boolean
    payment_received: boolean
    status: number
    offlineId?: string
    options: Object
}

const UPDATE_OPTIONS = { new: true }

const InvoiceStatusSchema = new mongoose.Schema({
    value: Number,
    label: String,
})
const InvoiceSchema = new mongoose.Schema({
    company_id: mongoose.Schema.Types.ObjectId,
    client_id: mongoose.Schema.Types.ObjectId,
    project_id: mongoose.Schema.Types.ObjectId,
    number: String,
    due_date: Date,
    issue_date: Date,
    project: {
        name: String,
        address: String,
        number: String,
    },
    client: {
        name: String,
        address: String,
        number: String,
        bank_number: String,
    },
    company: {
        name: String,
        address: String,
        number: String,
        bank_number: String,
    },
    issued_by: {
        name: String,
        user_id: mongoose.Schema.Types.ObjectId,
    },
    desciption: String,
    issued: Boolean,
    payment_received: Boolean,
    status: {
        type: InvoiceStatusSchema,
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

// InvoiceSchema.index({ name: 'text' })

InvoiceSchema.post('save', function (error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next(error);
    }
})

export const Model = mongoose.model('invoice', InvoiceSchema)


export function createInvoiceModelActions(model) {
    return {
        getItem($id, user) {
            return model.findById($id)
                .where('company_id')
                .equals(user.company_id)
        },

        create({ item, user, offlineId }: { item: IInvoice, user: IUser, offlineId?: string }) {
            let newItem = {
                ...item,
                offlineId,
                created_by: user._id,
                company_id: user.company_id,
            }

            return new model(newItem).save()
        },

        update({ item, user }: { item: IInvoice, user: IUser }) {
            return model.findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then((doc) => {
                    Object.assign(doc, item)

                    return doc.save()
                })
        },

        remove({ item, user }: { item: IInvoice, user: IUser }) {
            return model.findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id)
        },
    }
}

export default createInvoiceModelActions(Model)
