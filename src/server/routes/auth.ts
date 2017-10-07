import * as passport from 'passport'

import UserModel from '../models/user'
import {Model as CompanyModel} from '../models/company'
import { localAuthenticate } from '../middleware/localAuth'

const ROUTE_PREFIX = '/auth'

export default function registerAuthRoutes(app) {

    // TODO: add password reset route

    app.post(ROUTE_PREFIX + '/register', function(request, response) {
        let company_id

        if (!request.body.company_name) {
            return response.status(412).json({
                message: 'Company name is required'
            })
        }

        CompanyModel.create({
            name: request.body.company_name,
        })
        .then((company) => {
            company_id = company._id
            request.body.username = request.body.email

            UserModel.register(new UserModel({
                email : request.body.email,
                username : request.body.username,
                name : request.body.name,
                full_name : request.body.name,
                company_id
            }), request.body.password, function(err, user) {
                if (err) {
                    return response.status(412).json({ err })
                }

                localAuthenticate(request, response, function () {
                    response.status(200).json({ user, company })
                })
            })
        })


    })

    app.post(ROUTE_PREFIX + '/login', localAuthenticate)

    app.get(ROUTE_PREFIX + '/logout', function(req, res) {
        req.logout()
        res.redirect('/')
    })

    app.get(ROUTE_PREFIX + '/google/login', passport.authenticate('google', {
        scope : ['profile', 'email']
    }))

    app.get(ROUTE_PREFIX + '/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login',
            successRedirect : '/korisnik',
        })
    )
}
