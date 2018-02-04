import * as mongoose from 'mongoose'
const { promisify } = require('util')

import { IUser } from './user'
import { location, ITimestampsSchema, IModifiedBySchema } from './default'
import { IBaseInventoryItem, IBaseInventoryItemSchema } from './inventory.item'

export interface IFavoriteInventoryItem extends IBaseInventoryItem {}
export interface IFavoriteInventoryItemDocument
    extends IFavoriteInventoryItem,
        mongoose.Document {}

const InventoryFavoriteItemSchema = new mongoose.Schema(
    IBaseInventoryItemSchema,
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
)

InventoryFavoriteItemSchema.post('save', function(error: any, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'))
    } else {
        next(error)
    }
})

export const InventoryFavoriteItemModel = mongoose.model<
    IFavoriteInventoryItemDocument
>('inventory_item_favorite', InventoryFavoriteItemSchema)

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
            item: IFavoriteInventoryItem
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

        update({ item, user }: { item: IFavoriteInventoryItem; user: IUser }) {
            return model
                .findById(item._id)
                .where('company_id')
                .equals(user.company_id)
                .then(doc => {
                    Object.assign(doc, item)

                    return doc.save()
                })
        },

        remove({ item, user }: { item: IFavoriteInventoryItem; user: IUser }) {
            return model
                .findByIdAndRemove(item._id)
                .where('company_id')
                .equals(user.company_id)
        },
    }
}

export default createInvoiceItemModelActions(InventoryFavoriteItemModel)
