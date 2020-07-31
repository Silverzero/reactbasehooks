import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import { sessionReducer } from 'redux-react-session'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    session: sessionReducer
})

const composeEnhancers = ( (process.env.REACT_APP_MODE === "development") ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose)

export default function generateStore(){
    return createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
}