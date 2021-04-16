import { combineReducers, createStore, applyMiddleware } from 'redux'
import movieReducer from './reducers/movieReducer'
import seriesReducer from './reducers/seriesReducer'
import loadingReducer from './reducers/loadingReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({movies: movieReducer, series: seriesReducer, loading: loadingReducer})


const store = createStore(reducer, applyMiddleware(thunk))

export default store