import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'

import { Response } from 'express'
import { IRequest } from './request.interface'

import { localAuthMiddleware } from '../middleware/localAuth'
import API_PREFIX from './prefix'
import projectRoutes from './project'
import timesheetRoutes from './timesheet'
import userRoutes from './user'
import authRoutes from './auth'

const loginFileLocation = path.resolve(__dirname + '/../views/login.html')
const registerFileLocation = path.resolve(__dirname + '/../views/register.html')
const indexFileLocation = path.resolve(__dirname + '/../../public/index.html')
const staticMiddleware = express.static('public')


export default function registerRoutes(app) {
    app.get('/login', function(req: Response, res: Response) {
        res.sendFile(loginFileLocation)
    })

    app.get('/register', function(req: Response, res: Response) {
        res.sendFile(registerFileLocation)
    })

    authRoutes(app)

    app.use('/', localAuthMiddleware, staticMiddleware)

    // protect api routes
    app.all(API_PREFIX +  '/*', localAuthMiddleware)

    // api routes
    projectRoutes(app)
    timesheetRoutes(app)
    userRoutes(app)

    app.all('/*', localAuthMiddleware, staticMiddleware, function(req, res) {
        res.sendFile(indexFileLocation)
    })
}
