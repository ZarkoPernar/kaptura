import * as mongoose from 'mongoose'
const { promisify } = require('util')

import { IUser } from './user'
import { location, ITimestampsSchema, IModifiedBySchema } from './default'

interface IBaseInventoryItem extends ITimestampsSchema, IModifiedBySchema {
    _id: string
    company_id: string
    name: string
    description?: string
    type?: string
    brand_name?: string
    quantity?: number
    price?: number
    unit?: string
    offlineId?: string
}

export interface IInventoryItem extends IBaseInventoryItem {
    favorite_id?: string
}
export interface IFavoriteInventoryItem extends IBaseInventoryItem {}

const UPDATE_OPTIONS = { new: true }
const IBaseInventoryItemSchema = {
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
    price: mongoose.Schema.Types.Decimal128,
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
const InventoryFavoriteItemSchema = new mongoose.Schema(
    IBaseInventoryItemSchema,
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
InventoryFavoriteItemSchema.post('save', function(error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'))
    } else {
        next(error)
    }
})

export const InventoryItemModel = mongoose.model(
    'invoice_item',
    InventoryItemSchema,
)
export const InventoryFavoriteItemModel = mongoose.model(
    'invoice_item',
    InventoryFavoriteItemSchema,
)

export function createInvoiceItemModelActions(model) {
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
            item: IInvoiceItem
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

        update({ item, user }: { item: IInvoiceItem; user: IUser }) {
            return model
                .findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then(doc => {
                    Object.assign(doc, item)

                    return doc.save()
                })
        },

        remove({ item, user }: { item: IInvoiceItem; user: IUser }) {
            return model
                .findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id)
        },
    }
}

export default createInvoiceItemModelActions(Model)
