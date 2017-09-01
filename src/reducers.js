import { combineReducers } from 'redux'

import logsReducer from './clock/reducer'
import projectsReducer from './projects/reducer'

export default combineReducers({
    projects: projectsReducer,
    logs: logsReducer,
})

