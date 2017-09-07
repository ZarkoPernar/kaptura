import * as url from 'url'
import {Request, Response} from 'express'

import { IRequest } from './../routes/request.interface'
import TimesheetModel, { ITimesheet, Model } from '../models/timesheet'
import convertDates from '../utils/convertDates'

export interface ITimesheetListRequestParams {
    pages?: {
        pageSize: number,
        pageNumber: number,
    }
    user_id?: string
}

const defaultListParams = {
    pages: {
        pageSize: 25,
        pageNumber: 1,
    }
}

export async function getItem(request: IRequest, response: Response) {
    const urlParts = url.parse(request.url, true)
    const id = urlParts.query.id

    const result = await TimesheetModel.getItem(id, request.user)
    response.status(200).json(result)
}

export async function list(request: IRequest, response: Response) {
    const params: ITimesheetListRequestParams = request.body || defaultListParams

    if (!params.pages) {
        params.pages = defaultListParams.pages
    }

    const query = Model.find()
            .where('company_id')
            .equals(request.user.company_id)

    if (!params.user_id) {
        query
            .where('user_id')
            .equals(request.user.id)
    } else if (params.user_id !== 'all') {
        query
            .where('user_id')
            .equals(params.user_id)
    }

    const result = await query
        .sort({
            check_in: -1,
        })
        .skip(params.pages.pageSize * (params.pages.pageNumber - 1))
        .limit(params.pages.pageSize)

    response.status(200).json(result)
}

export async function create(request: IRequest, response: Response) {
    const item: ITimesheet = request.body
    console.log(request.body)
    const newItem = convertDates(item, ['check_in', 'check_out'])
    const offlineId = newItem._id
    delete newItem._id

    try {
        const result: any = await TimesheetModel.create({
            item: newItem,
            user: request.user,
            offlineId,
        })

        response.status(200).json(result)
    } catch(err) {
        response.status(412).json(err)
    }


}

export async function update(request: IRequest, response: Response) {
    const item: ITimesheet = request.body

    const newItem = convertDates(item, ['check_in', 'check_out'])

    const result = await TimesheetModel.update({
        item: newItem,
        user: request.user,
    })
    response.status(200).json(result)
}

export async function remove(request: IRequest, response: Response) {
    const result = await TimesheetModel.remove({
        item: request.body,
        user: request.user,
    })
    response.status(200).json(result)
}



