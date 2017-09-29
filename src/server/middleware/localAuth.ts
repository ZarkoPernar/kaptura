import { Response } from 'express'
import * as passport from 'passport'

import { IRequest } from '../routes/request.interface'

export const localAuthenticate = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect : '/',
})

export function localAuthMiddleware(request: IRequest, response: Response, next) {
    if (!request.isAuthenticated()) {
        response.redirect('/login')
    } else {
        next()
    }
}
