import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {loginReducer} from './Reducers/loginReducer/loginReducer'
import {newsReducer} from './Reducers/topNewsReducer/newsReducer'
import {articleReducer} from './Reducers/articleReducer/articleReducer'
import {appReducer} from './Reducers/appReducer/appReducer'

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    topNews: newsReducer,
    article: articleReducer,
})
const email = localStorage.getItem('email')
const apiKey = localStorage.getItem('apiKey')
const name = localStorage.getItem('name')

const info = email && apiKey ? {email, apiKey, name: name ? name : ''} : null
const initialState = {
    login: {
        userInfo: info,
        loading: false,
        errorMessage: '',
        successMessage: '',
    }
}

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export type StateType = ReturnType<typeof rootReducer>

export default store
