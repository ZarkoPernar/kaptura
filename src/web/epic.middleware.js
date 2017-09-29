import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { userInfoEpic } from './userInfo.reducer'
import { employeesEpic } from './employees/reducer'

const epics = combineEpics(userInfoEpic, employeesEpic)

export default createEpicMiddleware(epics)
