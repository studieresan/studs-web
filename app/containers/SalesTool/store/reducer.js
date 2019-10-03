import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'
import contactsReducer from './contacts/reducer'
import commentsReducer from './comments/reducer'
import statusesReducer from './statuses/reducer'
import { UPDATE_FILTER, UPDATE_SORTING } from './constants'

const defaultFilterState = {
  text: '',
  user: 'Alla',
  status: 'Alla',
}

const filterReducer = (state = defaultFilterState, action) => {
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

const defaultSortingState = {
  property: 'status',
  direction: 'DESC',
}

const sortingReducer = (state = defaultSortingState, action) => {
  switch (action.type) {
    case UPDATE_SORTING:
      return {
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
  sorting: sortingReducer,
})

export default reducer
