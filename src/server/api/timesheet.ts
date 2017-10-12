import { Request, Response } from 'express'

import { IRequest } from './../routes/request.interface'
import TimesheetModel, { ITimesheet, Model } from '../models/timesheet'
import convertDates from '../utils/convertDates'
import applyFilters from '../utils/applyFilters'

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
    const id = request.params.id

    const result = await TimesheetModel.getItem(id, request.user)
    response.status(200).json(result)
}

export async function list(request: IRequest, response: Response) {
    const params: ITimesheetListRequestParams = request.body || defaultListParams

    params.pages = {...defaultListParams.pages, ...params.pages}


    const query = Model.find()
        .where('company_id')
        .equals(request.user.company_id)

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
    const item: ITimesheet = request.body

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



