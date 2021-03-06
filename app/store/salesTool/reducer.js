import { combineReducers } from 'redux'
import companiesReducer from './companies/reducer'
import contactsReducer from './contacts/reducer'
import commentsReducer from './comments/reducer'
import contactRequestsReducer from './contactRequests/reducer'
import { UPDATE_FILTER, UPDATE_SORTING, SET_YEAR } from './constants'

const defaultFilterState = {
  text: '',
  user: [],
  status: [],
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
  ascending: false,
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

const studsYearReducer = (state = parseInt(process.env.STUDS_YEAR), action) => {
  switch (action.type) {
    case SET_YEAR:
      return action.payload
    default:
      return state
  }
}

const reducer = combineReducers({
  companies: companiesReducer,
  contacts: contactsReducer,
  comments: commentsReducer,
  filter: filterReducer,
  sorting: sortingReducer,
  contactRequests: contactRequestsReducer,
  year: studsYearReducer,
})

export default reducer
