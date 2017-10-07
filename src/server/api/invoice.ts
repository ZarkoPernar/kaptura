import * as url from 'url'
import {Request, Response} from 'express'

import { IRequest } from './../routes/request.interface'
import InvoiceActions, { IInvoice, Model } from '../models/invoice'
import convertDates from '../utils/convertDates'
import applyFilters from '../utils/applyFilters'

import UserModel from '../models/user'
import ClientActions from '../models/client'
import ProjectActions from '../models/project'
import CompanyActions from '../models/company'

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
    const urlParts = url.parse(request.url, true)
    const id = urlParts.query.id

    const result = await InvoiceActions.getItem(id, request.user)
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

    const newItem = convertDates(item, ['issue_date', 'due_date'])
    const offlineId = newItem._id
    delete newItem._id

    const [client, project, company, user,] = await Promise.all([
        ClientActions.getItem(item.client_id, request.user),
        ProjectActions.getItem(item.project_id, request.user),
        CompanyActions.getItem(request.user.company_id),
        UserModel.findById(request.user._id),
    ])

    try {
        const result = await InvoiceActions.create({
            item: {
                ...newItem,
                client,
                project,
                company,
                issued_by: {
                    user_id: user._id,
                    name: user.full_name,
                },
            },
            offlineId,
            user: request.user,
        })
        response.status(200).json(result)
    } catch(err) {
        response.status(412).json(err)
    }
}

export async function update(request: IRequest, response: Response) {
    const item: IInvoice = request.body

    const newItem = convertDates(item, ['issue_date', 'due_date'])

    const result = await InvoiceActions.update({
        item: newItem,
        user: request.user,
    })
    response.status(200).json(result)
}

export async function remove(request: IRequest, response: Response) {
    const result = await InvoiceActions.remove({
        item: request.body,
        user: request.user,
    })
    response.status(200).json(result)
}



