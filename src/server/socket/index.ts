const socketIo = require('socket.io')

import init from './init'
import { http } from '../index'

export const io = socketIo(http, { path: '/napi' })

init({ io })



