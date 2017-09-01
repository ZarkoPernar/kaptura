import { normalize, schema } from 'normalizr'

const projectSchema = new schema.Entity('projects', {}, {
    idAttribute: '_id'
})
export const projectListSchema = new schema.Array(projectSchema)

export const LOAD_PROJECTS = 'LOAD_PROJECTS'
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS'
export const LOAD_PROJECTS_ERROR = 'LOAD_PROJECTS_ERROR'

export default function reducer(state = {}, { payload, type }) {
    switch (type) {
        case LOAD_PROJECTS_SUCCESS:
            return normalize(payload, projectListSchema)
        default:
            return state
    }
}
