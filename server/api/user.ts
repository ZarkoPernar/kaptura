import { IRequest } from './../routes/request.interface'
import * as url from 'url'
import {Request, Response} from 'express'

import UserModel from '../models/user'

export async function userInfo(request: IRequest, response: Response) {
    response.status(200).json(request.user)
}

export async function update(request: IRequest, response: Response) {
    if (request.user._id.toString() !== request.body._id) {
        response.status(412).json({
            message: 'Forbidden'
        })
    } else {
        const result = await UserModel.findByIdAndUpdate(request.body._id, request.body)
        response.status(200).json(result)
    }
}
