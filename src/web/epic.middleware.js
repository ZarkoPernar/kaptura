import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { userInfoEpic, socketUserEpic } from './userInfo.reducer'
import { clientEpic } from './clients/reducer'
import { employeesEpic } from './employees/reducer'
import { companyEpic } from './company/reducer'

const epics = combineEpics(
    userInfoEpic,
    socketUserEpic,
    employeesEpic,
    companyEpic,
    clientEpic,
)

export default createEpicMiddleware(epics)
