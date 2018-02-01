import { Store } from './store'

test('it throws if reducer fn is no the first arg', () => {
    expect(() => {
        new Store({})
    }).toThrow()
})

test('getState() returns defaultState', () => {
    function reducer(state = {}, action) {
        return state
    }

    expect(new Store(reducer, 'hello').getState()).toEqual('hello')
})

test('action modifies the state', () => {
    function reducer(state = {}, action) {
        switch(action.type) {
            case 'TEST':
                return action.payload
            default:
                return state
        }
    }

    const store = new Store(reducer)

    store.dispatch({
        type: 'TEST',
        payload: 'HELLO'
    })

    expect(store.getState()).toEqual('HELLO')
})

test('combine reducers', () => {
    const reducers = {
        test: function reducer(state = {}, action) {
            switch (action.type) {
                case 'TEST':
                    return action.payload
                default:
                    return state
            }
        }
    }

    const store = new Store(Store.combineReducers(reducers))

    store.dispatch({
        type: 'TEST',
        payload: 'HELLO'
    })

    expect(store.getState().test).toEqual('HELLO')
})

