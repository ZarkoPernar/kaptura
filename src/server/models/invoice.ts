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
    issue_place: string
    project: {
        name: string
        google_address: string
        number: string
    }
    client: {
        name: string
        google_address: string
        number: string
        bank_number: string
        company_number: string
    }
    company: {
        name: string
        google_address: string
        company_number: string
        bank_number: string
    }
    issued_by: {
        name: string
        user_id: string
    }
    description?: string
    notes?: string
    terms?: string
    issued: boolean
    payment_received: boolean
    payment_type: string
    payment_information: string
    status: number
    offlineId?: string
    options: Object
}

const UPDATE_OPTIONS = { new: true }

const InvoiceStatusSchema = new mongoose.Schema({
    value: Number,
    label: String,
})
const InvoiceSchema = new mongoose.Schema(
    {
        company_id: mongoose.Schema.Types.ObjectId,
        client_id: mongoose.Schema.Types.ObjectId,
        project_id: mongoose.Schema.Types.ObjectId,
        number: String,
        due_date: Date,
        issue_date: Date,
        issue_place: String,
        project: {
            name: String,
            number: String,
            google_address: String,
        },
        client: {
            name: String,
            number: String,
            bank_number: String,
            company_number: String,
            google_address: String,
        },
        company: {
            name: String,
            company_number: String,
            bank_number: String,
            google_address: String,
        },
        issued_by: {
            name: String,
            user_id: mongoose.Schema.Types.ObjectId,
        },
        description: String,
        notes: String,
        terms: String,
        issued: Boolean,
        payment_received: Boolean,
        payment_type: String,
        payment_information: String,
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
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
)

// InvoiceSchema.index({ name: 'text' })

InvoiceSchema.post('save', function(error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'))
    } else {
        next(error)
    }
})

export const Model = mongoose.model('invoice', InvoiceSchema)

interface IInvoiceDocument extends mongoose.Document {}

export function createInvoiceModelActions(
    model: mongoose.Model<IInvoiceDocument>,
) {
    return {
        getItem($id, user) {
            return model
                .findById($id)
                .where('company_id')
                .equals(user.company_id)
        },

        create({
            item,
            user,
            offlineId,
        }: {
            item: IInvoice
            user: IUser
            offlineId?: string
        }) {
            let newItem = {
                ...item,
                offlineId,
                created_by: user._id,
                company_id: user.company_id,
            }

            return new model(newItem).save()
        },

        update({ item, user }: { item: IInvoice; user: IUser }) {
            return model
                .findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then(doc => {
                    if (doc === null) {
                        throw new Error(
                            'No document found with _id: ' + item._id,
                        )
                    }

                    Object.assign(doc, item)

                    return doc.save()
                })
        },

        remove({ item, user }: { item: IInvoice; user: IUser }) {
            return model
                .findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id)
        },
    }
}

export default createInvoiceModelActions(Model)
