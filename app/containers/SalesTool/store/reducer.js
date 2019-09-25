import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'
import contactsReducer from './contacts/reducer'
import commentsReducer from './comments/reducer'
import statusesReducer from './statuses/reducer'
import { UPDATE_FILTER } from './constants'

const defaultState = {
  text: '',
  user: 'Alla',
  status: 'Alla',
}

const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  companies: companiesReducer,
  contacts: contactsReducer,
  comments: commentsReducer,
  statuses: statusesReducer,
  filter: filterReducer,
})

export default reducer
