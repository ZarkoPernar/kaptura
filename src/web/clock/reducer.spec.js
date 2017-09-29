import reducer from './reducer'

describe('fuck', () => {
    test('returns initialState', () => {
        const initialState = {}
        const actualResult = reducer(initialState, {})

        expect(actualResult === initialState).toBe(true)
    })

    test('add', () => {
        const initialState = {}
        const LOG = {}
        const actualResult = reducer(initialState, {
            type: 'ADD_LOG',
            payload: LOG
        })

        expect(actualResult.allIds.length).toBe(1)
    })

    test('load', () => {
        const initialState = {}
        const LOGS = [{_id: 1}, {_id: 2}]
        const actualResult = reducer(initialState, {
            type: 'LOAD_LOGS_SUCCESS',
            payload: LOGS
        })

        expect(actualResult.allIds.length).toBe(2)
    })
})
