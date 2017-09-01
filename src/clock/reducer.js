import { normalize, denormalize, schema } from 'normalizr'

import { list, add as addApi, update as updateApi } from './clock.api'
import { findByIdAndReplace } from '../utils/array.utils'

const logSchema = new schema.Entity('logs', {}, {
    idAttribute: '_id'
})
export const logsSchema = new schema.Array(logSchema)

export const LOAD_LOGS = 'LOAD_LOGS'
export const LOAD_LOGS_SUCCESS = 'LOAD_LOGS_SUCCESS'
export const LOAD_LOGS_ERROR = 'LOAD_LOGS_ERROR'

export const ADD_LOG = 'ADD_LOG'
export const ADD_LOG_SUCCESS = 'ADD_LOG_SUCCESS'
export const ADD_LOG_ERROR = 'ADD_LOG_ERROR'

export const EDIT_LOG = 'EDIT_LOG'
export const EDIT_LOG_SUCCESS = 'EDIT_LOG_SUCCESS'
export const EDIT_LOG_ERROR = 'EDIT_LOG_ERROR'

export default function reducer(state={}, { payload, type }) {
    switch(type) {
        case LOAD_LOGS_SUCCESS:
            return normalize(payload, logsSchema)
        case ADD_LOG:
            return add(payload, state)
        case ADD_LOG_SUCCESS:
            return updateLast(payload, state)

        case EDIT_LOG:
            return updateById(payload, state)
        case EDIT_LOG_SUCCESS:
            return updateById(payload, state)

        default:
            return state
    }
}

function add(payload, state) {
    const denormalized = denormalize(state.result, logsSchema, state.entities)
    const updatedLogs = [...denormalized, payload]

    return normalize(updatedLogs, logsSchema)
}

function updateLast(payload, state) {
    const denormalized = denormalize(state.result, logsSchema, state.entities)
    const updatedLogs = denormalized.slice(0, denormalized.length - 1)
    updatedLogs.push(payload)

    return normalize(updatedLogs, logsSchema)
}

function updateById(payload, state) {
    const denormalized = denormalize(state.result, logsSchema, state.entities)

    const updatedLogs = findByIdAndReplace(denormalized, payload)

    return normalize(updatedLogs, logsSchema)
}

export function loadLogs() {
    return dispatch => {
        dispatch(loadLogsRequest())
        return list()
            .then(res => dispatch(loadLogsSuccess(res)))
            .catch(ex => dispatch(loadLogsFailure(ex)))
    }
}

export function addLog(log) {
    return dispatch => {
        dispatch(addLogRequest(log))
        return addApi(log)
            .then(res => dispatch(addLogSuccess(res)))
            .catch(ex => dispatch(addLogFailure(ex)))
    }
}

export function updateLog(log) {
    return dispatch => {
        dispatch(updateLogRequest(log))
        return updateApi(log)
            .then(res => dispatch(updateLogSuccess(res)))
            .catch(ex => dispatch(updateLogFailure(ex)))
    }
}

function addLogRequest(payload) {
    return {
        type: ADD_LOG,
        payload,
    }
}

function addLogSuccess(payload) {
    return {
        type: ADD_LOG_SUCCESS,
        payload
    }
}

function addLogFailure(error) {
    return {
        type: ADD_LOG_ERROR,
        error
    }
}

function updateLogRequest(payload) {
    return {
        type: EDIT_LOG,
        payload,
    }
}

function updateLogSuccess(payload) {
    return {
        type: EDIT_LOG_SUCCESS,
        payload
    }
}

function updateLogFailure(error) {
    return {
        type: EDIT_LOG_ERROR,
        error
    }
}


function loadLogsRequest() {
    return {
        type: LOAD_LOGS,
    }
}

function loadLogsSuccess(payload) {
    return {
        type: LOAD_LOGS_SUCCESS,
        payload
    }
}

function loadLogsFailure(error) {
    return {
        type: LOAD_LOGS_ERROR,
        error
    }
}
