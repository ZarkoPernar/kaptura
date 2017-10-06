import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { userInfoEpic, socketUserEpic } from './userInfo.reducer'
import { employeesEpic } from './employees/reducer'
import { companyEpic } from './company/reducer'

const epics = combineEpics(userInfoEpic, socketUserEpic, employeesEpic, companyEpic)

export default createEpicMiddleware(epics)
