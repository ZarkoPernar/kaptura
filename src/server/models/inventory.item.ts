import * as mongoose from 'mongoose'
const { promisify } = require('util')

import { IUser } from './user'
import { location, ITimestampsSchema, IModifiedBySchema } from './default'

export interface IBaseInventoryItem
    extends ITimestampsSchema,
        IModifiedBySchema {
    _id: any
    company_id: string
    name: string
    description?: string
    type?: string
    brand_name?: string
    quantity?: number
    price?: number
    currency: {
        symbol: string
        separator: string
        decimal: string
        label: string
        value: string
    }
    unit?: string
    offlineId?: string
}

export interface IInventoryItem extends IBaseInventoryItem {
    favorite_id?: string
}

export interface IInventoryItemDocument
    extends IInventoryItem,
        mongoose.Document {}

const UPDATE_OPTIONS = { new: true }
export const IBaseInventoryItemSchema = {
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
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
    currency: {
        separator: {
            type: String,
            default: ',',
        },
        symbol: String,
        decimal: {
            type: String,
            default: '.',
        },
        label: String,
        value: String,
    },
    // price: Number,
    offlineId: String,
}

const InventoryItemSchema = new mongoose.Schema(
    {
        ...IBaseInventoryItemSchema,
        favorite_id: mongoose.Schema.Types.ObjectId,
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
)

// InvoiceItemSchema.index({ name: 'text' })

InventoryItemSchema.post('save', function(error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'))
    } else {
        next(error)
    }
})

export const InventoryItemModel = mongoose.model<IInventoryItemDocument>(
    'inventory_item',
    InventoryItemSchema,
)

export function createInvoiceItemModelActions(
    model: mongoose.Model<IInventoryItemDocument>,
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
            item: IInventoryItem
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

        update({ item, user }: { item: IInventoryItem; user: IUser }) {
            return model
                .findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then(doc => {
                    if (!doc) return Promise.resolve(doc)
                    Object.assign(doc, item)

                    return doc.save()
                })
        },

        remove({ item, user }: { item: IInventoryItem; user: IUser }) {
            return model
                .findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id)
        },
    }
}

export default createInvoiceItemModelActions(InventoryItemModel)
