import * as mongoose from 'mongoose'
const { promisify } = require('util')

import { IUser } from './user'
import { location, ITimestampsSchema, IModifiedBySchema } from './default'

export interface IInvoiceItem extends ITimestampsSchema, IModifiedBySchema {
    _id: string
    company_id: string
    project_id?: string
    client_id?: string
    invoice_id: string
    name: string
    description?: string
    type?: string
    brand_name?: string
    quantity?: number
    price?: number
    notes?: string
    offlineId?: string
}

const UPDATE_OPTIONS = { new: true }

const InvoiceItemSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    client_id: mongoose.Schema.Types.ObjectId,
    project_id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: String,
    type: String,
    brand_name: String,
    quantity: Number,
    // price: mongoose.Schema.Types.Decimal128,
    price: Number,
    notes: String,
    offlineId: String,
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// InvoiceItemSchema.index({ name: 'text' })

InvoiceItemSchema.post('save', function (error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next(error);
    }
})

export const Model = mongoose.model('invoice_item', InvoiceItemSchema)


export function createInvoiceItemModelActions(model) {
    return {
        getItem($id, user) {
            return model.findById($id)
                .where('company_id')
                .equals(user.company_id)
        },

        create({ item, user, offlineId }: { item: IInvoiceItem, user: IUser, offlineId?: string }) {
            let newItem = {
                ...item,
                offlineId,
                created_by: user._id,
                company_id: user.company_id,
            }

            return new model(newItem).save()
        },

        update({ item, user }: { item: IInvoiceItem, user: IUser }) {
            return model.findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then((doc) => {
                    Object.assign(doc, item)

                    return doc.save()
                })
        },

        remove({ item, user }: { item: IInvoiceItem, user: IUser }) {
            return model.findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id)
        },
    }
}

export default createInvoiceItemModelActions(Model)
