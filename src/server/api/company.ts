import * as url from 'url'
import { Response } from 'express'

import { IRequest } from './../routes/request.interface'
import CompanyModel, { ICompany } from '../models/company'

// export async function getItem(request: IRequest, response: Response) {
//     const urlParts = url.parse(request.url, true)
//     const id = urlParts.query.id

//     const result = await TimesheetModel.getItem(id, request.user)
//     response.status(200).json(result)
// }

export async function update(request: IRequest, response: Response) {
    const item: ICompany = request.body
    const newItem = {...item}

    if (item.latitude && item.longitude) {
        newItem.position = {
            type: 'Point',
            coordinates: [item.longitude, item.latitude]
        }
    }

    const result = await CompanyModel.update({
        company: newItem,
        user: request.user,
    })
    response.status(200).json(result)
}
