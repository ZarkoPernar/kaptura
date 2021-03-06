import { combineReducers } from 'redux'

import timesheet from './timesheet/reducer'
import clock from './clock/reducer'
import timesheetList from './clock/timesheetListReducer'
import projects from './projects/reducer'
import projectList from './projects/listReducer'
import companyInfo from './company/reducer'
import clients from './clients/reducer'
import invoices from './invoices/reducer'
import invoice_items from './invoices/itemsReducer'
import invoice_items_list from './invoices/itemsListReducer'
import invoiceList from './invoices/listReducer'
import userInfo from './userInfo.reducer'
import employees, { onlineEmployees } from './employees/reducer'
import localeReducer from './company/locale.reducer'
import createStoreList from './utils/createStoreList'

import {
    inventoryStoreList,
    inventoryFavoritesStoreList,
} from './inventory/reducer'

export default combineReducers({
    locale: localeReducer,
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
    invoice_items,
    invoice_items_list,
    employees,
    onlineEmployees: onlineEmployees.reducer,
    notifications: createStoreList('notifications').reducer,
    [inventoryStoreList.name]: inventoryStoreList.reducer,
    [inventoryFavoritesStoreList.name]: inventoryFavoritesStoreList.reducer,
})
