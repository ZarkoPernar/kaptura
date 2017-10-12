import { Request, Response } from 'express'

import { IRequest } from './../routes/request.interface'
import ClientModel, { IClient, Model } from '../models/client'
import convertDates from '../utils/convertDates'

export interface IClienttListRequestParams {
    name: string
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

    const result = await ClientModel.getItem(id, request.user)
    response.status(200).json(result)
}

export async function list(request: IRequest, response: Response) {
    const params: IClienttListRequestParams = request.body || defaultListParams

    if (!params.pages) {
        params.pages = defaultListParams.pages
    }

    const query = Model.find()
    if (!request.user.company_id) {
        query
            .where('created_by')
            .equals(request.user._id)
    } else {
        query
            .where('company_id')
            .equals(request.user.company_id)
    }

    if (params.name !== undefined) {
        query.find({ name: { $regex: new RegExp(params.name, 'gi',) } })
    }

    const result = await query
        .sort({
            created_at: -1,
        })
        .skip(params.pages.pageSize * (params.pages.pageNumber - 1))
        .limit(params.pages.pageSize)

    response.status(200).json(result)
}

export async function create(request: IRequest, response: Response) {
    const item: IClient = request.body

    const newItem = { ...item }
    const offlineId = newItem._id
    delete newItem._id

    try {
        const result = await ClientModel.create({
            item: newItem,
            offlineId,
            user: request.user,
        })
        response.status(200).json(result)
    } catch(err) {
        response.status(412).json(err)
    }
}

export async function update(request: IRequest, response: Response) {
    const item: IClient = request.body

    const newItem = { ...item }

    const result = await ClientModel.update({
        item: newItem,
        user: request.user,
    })
    response.status(200).json(result)
}

export async function remove(request: IRequest, response: Response) {
    const result = await ClientModel.remove({
        item: request.body,
        user: request.user,
    })
    response.status(200).json(result)
}



