import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import createStoreItem from './createStoreItem'

const middleware = applyMiddleware(thunk)

let storeItem
let store

beforeEach(() => {
    storeItem = createStoreItem('test', {
        api: {
            list(params) {
                if (params && params.reject) return Promise.reject(new Error('Bad request'))

                return Promise.resolve([{
                    _id: 1,
                }, {
                    _id: 2
                }])
            },
            add(log) {
                if (log && log.reject) return Promise.reject(new Error('Bad request'))

                return Promise.resolve({
                    offlineId: log._id,
                    _id: 2,
                })
            },
            update(log) {
                if (log && log.reject) return Promise.reject(new Error('Bad request'))

                return Promise.resolve({
                    ...log,
                    updated_at: 'test',
                })
            },
        }
    })

    store = createStore(
        combineReducers({
            test: storeItem.reducer
        }),
        {test: {}},
        middleware,
    )
})

describe('it', () => {
    test('throws when no name', () => {
        expect(() => {
            createStoreItem()
        }).toThrow()
    })

    test('it returns an object with an actions object, and reducer function', () => {
        const expectedResult = expect.objectContaining({
            actions: expect.any(Object),
            reducer: expect.any(Function),
        })
        const actualResult = createStoreItem('test')

        expect(actualResult).toEqual(expectedResult)
    })

    test('add action exists', () => {
        const storeItem = createStoreItem(name)
        expect(storeItem.actions.add).toBeDefined()
    })

    test('add action returns a function', () => {
        const { add } = createStoreItem(name).actions

        expect(typeof add()).toEqual('function')
    })

    test('no api add action adds an item', () => {
        const { add } = storeItem.actions
        const item = { _id: 1 }
        const expectedResult = {
            byId: {1: item},
            allIds: [1]
        }

        store.dispatch(add(item))

        const actualResult = store.getState()


        expect(actualResult.test).toEqual(expectedResult)
    })

    test('add action with api adds an item and then updates', (done) => {
        const { add } = storeItem.actions
        const item = { _id: 1 }
        const expectedResult = {
            byId: { 2: {
                _id: 2,
                offlineId: 1,
            } },
            allIds: [2]
        }

        store.dispatch(add(item)).then(() => {
            const actualResult = store.getState()
            expect(actualResult.test).toEqual(expectedResult)

            done()
        })
    })

    test('list action returns a function', () => {
        const { list } = createStoreItem(name).actions

        expect(typeof list()).toEqual('function')
    })

    test('list action with api loads all items from api', (done) => {
        const { list } = storeItem.actions
        const offlineList = [{
            _id: 1,
        }]
        const expectedResult = {
            byId: {
                1: {
                    _id: 1,
                },
                2: {
                    _id: 2,
                }
            },
            allIds: [1, 2]
        }

        store.dispatch(list({}, offlineList)).then(() => {
            const actualResult = store.getState()
            expect(actualResult.test).toEqual(expectedResult)

            done()
        })
    })

    test('list action adds offlineItems', () => {
        const { list } = storeItem.actions
        const offlineList = [{
            _id: 1,
        }]
        const expectedResult = {
            byId: {
                1: {
                    _id: 1,
                },
            },
            allIds: [1,]
        }

        store.dispatch(list({}, offlineList))

        const actualResult = store.getState()
        expect(actualResult.test).toEqual(expectedResult)

    })

    test('update action returns a function', () => {
        const { update } = createStoreItem(name).actions

        expect(typeof update()).toEqual('function')
    })

    test('update action with api update an item and then updates from server', () => {
        const { update, list } = storeItem.actions
        const offlineList = [{
            _id: 1,
        }, {
            _id: 2,
        }]
        const item = { _id: 1, newField: 1, }
        const expectedResult = {
            byId: {
                1: {
                    _id: 1,
                    newField: 1,
                },
                2: {
                    _id: 2,
                }
            },
            allIds: [1, 2]
        }

        // this is just setup, reject is so the request is sync,
        // and there are no race conditions
        store.dispatch(list({reject: true}, offlineList))

        store.dispatch(update(item))

        const actualResult = store.getState()
        expect(actualResult.test).toEqual(expectedResult)
    })

    test('update action with api update an item and then updates from server', (done) => {
        const { update, list } = storeItem.actions
        const offlineList = [{
            _id: 1,
        }, {
            _id: 2,
        }]
        const item = { _id: 1, newField: 1, }
        const expectedResult = {
            byId: {
                1: {
                    _id: 1,
                    newField: 1,
                    updated_at: 'test',
                },
                2: {
                    _id: 2,
                }
            },
            allIds: [1, 2]
        }

        // this is just setup, reject is so the request is sync,
        // and there are no race conditions
        store.dispatch(list({ reject: true }, offlineList))


        store.dispatch(update(item)).then(() => {
            const actualResult = store.getState()
            expect(actualResult.test).toEqual(expectedResult)

            done()
        })
    })
})

