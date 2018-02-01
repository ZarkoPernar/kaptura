
export class Store {
    _state = null
    _reducer = null

    constructor(reducer, defaultState) {
        if (typeof reducer !== 'function') {
            throw new Error('First argument of Store constructor must be a function reducer')
        }

        if (defaultState !== undefined) {
            this._state = defaultState
        }

        this._reducer = reducer

        this._state = reducer(this._state, {
            type: '@@init',
        })
    }

    dispatch(action) {
        this._state = this._reducer(this._state, action)
    }

    subscribe(callback) {
        const index = this._callbacks.push(callback) - 1

        return function unsubscribe() {
            this._callbacks.splice(index, 1)
        }
    }

    getState() {
        return this._state
    }

    static combineReducers(reducers) {
        const arr = Object.entries(reducers)

        return function reducer(state, action) {
            return arr.reduce((obj, [key, fn]) => {
                return Object.assign(obj, {
                    [key]: fn(state, action)
                })
            }, {})
        }
    }
}


