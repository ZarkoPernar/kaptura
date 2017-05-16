import * as url from 'url'
import {Request, Response} from 'express'

import ClientModel, { IClient } from '../models/client'
import convertDates from '../utils/convertDates'

export async function getItem(request: Request, response: Response) {
    const urlParts = url.parse(request.url, true)
    const id = urlParts.query.id

    const result = await ClientModel.getItem(id)
    response.status(200).json(result)
}

export async function list(request: Request, response: Response) {
    const urlParts = url.parse(request.url, true)

    const result = await ClientModel.list()
    response.status(200).json(result)
}

export async function create(request: Request, response: Response) {
    const input: IClient = request.body

    convertDates(input)

    const result = await ClientModel.create(input)
    response.status(200).json(result)
}

export async function update(request: Request, response: Response) {
    const input: IClient = request.body

    convertDates(input)

    const result = await ClientModel.update(input)
    response.status(200).json(result)
}

export async function remove(request: Request, response: Response) {
    const result = await ClientModel.remove(request.body._id)
    response.status(200).json(result)
}



