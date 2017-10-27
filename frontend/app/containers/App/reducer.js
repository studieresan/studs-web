import { fromJS, Map, } from 'immutable'
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './constants'
import { loggedIn, } from '../../auth'
import { defaultUser, } from '../User/reducer'

const initialState = fromJS({
  user: defaultUser,
  loggedIn: loggedIn(),
  loginError: false,
  fetchingUser: false,
})

function reducer(state = initialState, action) {
  switch (action.type) {
  case GET_USER_REQUEST:
    return state.set('fetchingUser', true)
  case GET_USER_SUCCESS:
    return state.merge(Map({
      user: Map(action.user),
      fetchingUser: false,
    }))
  case GET_USER_ERROR:
    return state.merge(Map({
      fetchingUser: false,
    }))
  case LOGIN_SUCCESS:
    return state.merge(Map({
      loggedIn: true,
      loginError: false,
    }))
  case LOGIN_ERROR:
    return state.set('loginError', true)
  case LOGOUT:
    return state.merge(Map({
      loggedIn: false,
      user: null,
    }))
  default:
    return state
  }
}

export default reducer
