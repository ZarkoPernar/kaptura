import { IRequest } from './../routes/request.interface'
import * as url from 'url'
import {Request, Response} from 'express'

import UserModel from '../models/user'
import CompanyModel from '../models/company'

export async function userInfo(request: IRequest, response: Response): Promise<void> {
    const [company, employees] = await Promise.all([
        CompanyModel
            .findById(request.user.company_id),
        UserModel.find()
            .where('company_id')
            .equals(request.user.company_id)])

    const result = {
        user: request.user,
        company,
        employees,
    }

    response.status(200).json(result)
}

export async function update(request: IRequest, response: Response): Promise<void> {
    if (request.user._id.toString() !== request.body._id) {
        response.status(412).json({
            message: 'Forbidden'
        })
    } else {
        const result = await UserModel.findByIdAndUpdate(request.body._id, request.body)
        response.status(200).json(result)
    }
}
