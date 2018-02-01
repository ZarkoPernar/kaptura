import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'

import { Response } from 'express'
import { IRequest } from './request.interface'
import apiLogging from '../middleware/apiLogging'

import { localAuthMiddleware } from '../middleware/localAuth'
import API_PREFIX from './prefix'
import projectRoutes from './project'
import clientRoutes from './client'
import invoiceRoutes from './invoice'
import invoiceItemRoutes from './invoice.item'
import timesheetRoutes from './timesheet'
import userRoutes from './user'
import authRoutes from './auth'
import employeeRoutes from './employee'
import companyRoutes from './company'

const loginFileLocation = path.resolve(__dirname + '/../views/login.html')
const registerFileLocation = path.resolve(__dirname + '/../views/register.html')
const indexFileLocation = path.resolve(process.cwd() + '/public/index.html')
const staticMiddleware = express.static(process.cwd() + '/public')

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
    app.all(API_PREFIX + '/*', localAuthMiddleware)

    // log everything on api routes to mongo
    // app.all(API_PREFIX + '/*', apiLogging)

    // api routes
    projectRoutes(app)
    clientRoutes(app)
    invoiceRoutes(app)
    invoiceItemRoutes(app)
    timesheetRoutes(app)
    userRoutes(app)
    companyRoutes(app)
    employeeRoutes(app)

    app.all('*', localAuthMiddleware, staticMiddleware, (req, res) => {
        res.sendFile('index.html', { root: process.cwd() + '/public' })
    })
}
