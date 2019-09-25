import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'
import contactsReducer from './contacts/reducer'

const reducer = combineReducers({
  companies: companiesReducer,
  contacts: contactsReducer,
})

export default reducer
