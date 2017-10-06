import { combineReducers } from 'redux'

import timesheet from './timesheet/reducer'
import clock from './clock/reducer'
import timesheetList from './clock/timesheetReducer'
import projects from './projects/reducer'
import projectList from './projects/listReducer'
import companyInfo from './company/reducer'
import clients from './clients/reducer'
import invoices from './invoices/reducer'
import invoiceList from './invoices/listReducer'
import userInfo from './userInfo.reducer'
import employees from './employees/reducer'

export default combineReducers({
    userInfo,
    companyInfo,
    timesheet,
    timesheetList,
    clock,
    projects,
    projectList,
    clients,
    invoices,
    invoiceList,
    employees,
})

