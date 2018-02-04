import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './appReducers'
import epicMiddleware from './epic.middleware'

const middleware = applyMiddleware(thunk, epicMiddleware)

const mid =
    window.__REDUX_DEVTOOLS_EXTENSION__ === undefined
        ? middleware
        : compose(
              middleware,
              window.__REDUX_DEVTOOLS_EXTENSION__ &&
                  window.__REDUX_DEVTOOLS_EXTENSION__(),
          )

const store = createStore(reducers, {}, mid)

export default store
