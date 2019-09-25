import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'
import contactsReducer from './contacts/reducer'
import commentsReducer from './comments/reducer'

const reducer = combineReducers({
  companies: companiesReducer,
  contacts: contactsReducer,
  comments: commentsReducer,
})

export default reducer
