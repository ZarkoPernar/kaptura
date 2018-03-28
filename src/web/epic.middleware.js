import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { userInfoEpic, socketUserEpic } from './userInfo.reducer'
import { clientEpic } from './clients/reducer'
import { employeesEpic } from './employees/reducer'
import { companyEpic } from './company/reducer'
import { inventoryEpic } from './inventory/reducer'

const epics = combineEpics(
    userInfoEpic,
    socketUserEpic,
    employeesEpic,
    companyEpic,
    clientEpic,
    inventoryEpic,
)

export default createEpicMiddleware(epics)
