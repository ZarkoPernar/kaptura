import { Request, Response } from 'express'
import { startOfYear } from 'date-fns'

import { emitCompanySocket } from '../socket/api'
import { IRequest } from './../routes/request.interface'
import InvoiceItemActions, { IInvoiceItem, Model } from '../models/invoice.item'
import convertDates from '../utils/convertDates'
import applyFilters from '../utils/applyFilters'

export interface IProjectListRequestParams {
    // name: string
    pages: {
        pageSize: number,
        pageNumber: number,
    }
}

const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    }
}

export async function getItem(request: IRequest, response: Response) {
    const id = request.params.id

    const result = await InvoiceItemActions.getItem(id, request.user)
    response.status(200).json(result)
}

export async function list(request: IRequest, response: Response) {
    const params: IProjectListRequestParams = request.body || defaultListParams

    if (!params.pages) {
        params.pages = defaultListParams.pages
    }

    const query = Model.find()
        .where('company_id')
        .equals(request.user.company_id)

    // if (params.name !== undefined) {
    //     query.find({ name: { $regex: new RegExp(params.name, 'gi',) } })
    // }

    applyFilters(params, query)

    const result = await query
        .sort({
            created_at: -1,
        })
        .skip(params.pages.pageSize * (params.pages.pageNumber - 1))
        .limit(params.pages.pageSize)

    response.status(200).json(result)
}

export async function create(request: IRequest, response: Response) {
    const item = request.body

    const newItem = {...item}
    const offlineId = newItem._id
    delete newItem._id

    try {
        const result = await InvoiceItemActions.create({
            item: newItem,
            offlineId,
            user: request.user,
        })
        response.status(200).json(result)

        emitCompanySocket(
            request.user.company_id.toString(),
            { type: 'invoice_item_create', payload: result },
            request.user._id.toString(),
        )
    } catch(err) {
        response.status(412).json(err)
    }
}

export async function update(request: IRequest, response: Response) {
    const item: IInvoiceItem = request.body

    const newItem = { ...item }

    const result = await InvoiceItemActions.update({
        item: newItem,
        user: request.user,
    })

    response.status(200).json(result)

    emitCompanySocket(
        request.user.company_id.toString(),
        { type: 'invoice_item_update', payload: result },
        request.user._id.toString(),
    )
}

export async function remove(request: IRequest, response: Response) {
    const result = await InvoiceItemActions.remove({
        item: request.body,
        user: request.user,
    })
    response.status(200).json(result)
}


