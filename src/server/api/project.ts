import * as url from 'url'
import {Request, Response} from 'express'

import { IRequest } from './../routes/request.interface'
import ProjectModel, { IProject, Model } from '../models/project'
import convertDates from '../utils/convertDates'
import applyFilters from '../utils/applyFilters'

export interface IProjectListRequestParams {
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
    const urlParts = url.parse(request.url, true)
    const id = urlParts.query.id

    const result = await ProjectModel.getItem(id, request.user)
    response.status(200).json(result)
}

export async function list(request: IRequest, response: Response) {
    const params: IProjectListRequestParams = request.body || defaultListParams

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
    const item: IProject = request.body

    const newItem = convertDates(item, ['start_date', 'end_date'])
    const offlineId = newItem._id
    delete newItem._id

    try {
        const result = await ProjectModel.create({
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
    const item: IProject = request.body

    const newItem = convertDates(item, ['start_date', 'end_date'])

    const result = await ProjectModel.update({
        item: newItem,
        user: request.user,
    })
    response.status(200).json(result)
}

export async function remove(request: IRequest, response: Response) {
    const result = await ProjectModel.remove({
        item: request.body,
        user: request.user,
    })
    response.status(200).json(result)
}



