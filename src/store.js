import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './state'
import history from './history'

const preloadedState = Object.assign(
    JSON.parse(window.localStorage.getItem('pokedex') || '{"pokemon":{}}'),
    { updates: undefined }
)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer,
    }), preloadedState,
    composeEnhancers(
        applyMiddleware(routerMiddleware(history), thunk)
    )
)

store.subscribe(function () {
    window.localStorage.setItem('pokedex', JSON.stringify(
        {...store.getState(), router: undefined }
    ))
})

export default store