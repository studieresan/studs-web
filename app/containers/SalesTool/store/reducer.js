import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'
import contactsReducer from './contacts/reducer'
import commentsReducer from './comments/reducer'
import statusesReducer from './statuses/reducer'

const reducer = combineReducers({
  companies: companiesReducer,
  contacts: contactsReducer,
  comments: commentsReducer,
  statuses: statusesReducer,
})

export default reducer
