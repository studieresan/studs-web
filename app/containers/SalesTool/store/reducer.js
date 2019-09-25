import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'

const reducer = combineReducers({
  companies: companiesReducer,
})

export default reducer
