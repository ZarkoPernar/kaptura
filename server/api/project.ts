import * as url from 'url'
import {Request, Response} from 'express'

import ProjectModel, { IProject } from '../models/project'
import convertDates from '../utils/convertDates'

export async function getItem(request: Request, response: Response) {
    const urlParts = url.parse(request.url, true)
    const id = urlParts.query.id

    const result = await ProjectModel.getItem(id)
    response.status(200).json(result)
}

export async function list(request: Request, response: Response) {
    const urlParts = url.parse(request.url, true)

    const result = await ProjectModel.list()
    response.status(200).json(result)
}

export async function create(request: Request, response: Response) {
    const input: IProject = request.body

    convertDates(input)

    try {
        const result = await ProjectModel.create(input)
        response.status(200).json(result)
    } catch(err) {
        response.status(412).json(err)
    }


}

export async function update(request: Request, response: Response) {
    const input: IProject = request.body

    convertDates(input)

    const result = await ProjectModel.update(input)
    response.status(200).json(result)
}

export async function remove(request: Request, response: Response) {
    const result = await ProjectModel.remove(request.body._id)
    response.status(200).json(result)
}



