import { combineReducers } from 'redux'

import logs from './clock/reducer'
import projects from './projects/reducer'
import clients from './clients/reducer'
import userInfo from './userInfo.reducer'
import employees from './employees/reducer'

export default combineReducers({
    userInfo,
    logs,
    projects,
    clients,
    employees,
})

