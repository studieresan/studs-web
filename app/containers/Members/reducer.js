import { fromJS, Map } from 'immutable'
import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  MEMBER_SELECTED,
} from './constants'

const initialState = fromJS({
  users: [],
  companyUsers: [],
  fetching: false,
  error: false,
  selectedMember: '',
})

function membersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS_REQUEST:
      return state.set('fetching', true)
    case GET_MEMBERS_SUCCESS:
      return state.merge(
        fromJS({
          users: action.users,
          fetching: false,
          error: false,
        })
      )
    case GET_MEMBERS_ERROR:
      return state.merge(
        Map({
          fetching: false,
          error: true,
        })
      )
    case MEMBER_SELECTED:
      return state.set('selectedMember', action.id)
    default:
      return state
  }
}

export default membersReducer
