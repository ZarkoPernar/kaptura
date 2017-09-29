import * as url from 'url'
import {Request, Response} from 'express'

import { IRequest } from './../routes/request.interface'
import Model, { IUser } from '../models/user'
import convertDates from '../utils/convertDates'

export interface IEmployeeListRequestParams {
    name?: string
}

const defaultListParams = {}

export async function getItem(request: IRequest, response: Response) {
    const urlParts = url.parse(request.url, true)
    const id = urlParts.query.id

    const result = await Model.getById(id)

    response.status(200).json(result)
}

export async function list(request: IRequest, response: Response) {
    const params: IEmployeeListRequestParams = request.body || defaultListParams

    const query = Model.find()
        .where('company_id')
        .equals(request.user.company_id)


    if (params.name !== undefined) {
        query.find({ name: { $regex: new RegExp(params.name, 'gi',) } })
    }

    const result = await query
        // .sort({
        //     created_at: -1,
        // })

    response.status(200).json(result)
}

export async function create(request: IRequest, response: Response) {
    const item = request.body
    const newUser = {
        offlineId: item._id,
        full_name: item.full_name,
        email: item.email,
        username: item.email,
        created_by: request.user._id,
        company_id: request.user.company_id,
    }

    Model.register(new Model(newUser), item.password, function(err, user) {
        if (err) {
            return response.status(412).json({ err })
        }

        response.status(200).json(user)
    })
}

export async function update(request: IRequest, response: Response) {
    const item: IUser = request.body

    const newItem = convertDates(item, ['start_date', 'end_date'])

    const result = await Model.update({
        item: newItem,
        user: request.user,
    })
    response.status(200).json(result)
}

export async function remove(request: IRequest, response: Response) {
    const result = await Model.remove({
        item: request.body,
        user: request.user,
    })
    response.status(200).json(result)
}



