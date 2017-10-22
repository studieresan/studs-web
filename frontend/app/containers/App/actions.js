import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './constants'
import {
  fetchUser,
  loginUser,
} from '../../api'
import { removeToken, } from '../../auth'

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
  }
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user: {
      id: user.id,
      email: user.email,
      // TODO name should not be missing, add fields to backend
      firstName: user.first_name || 'NAME_MISSING',
      lastName: user.last_name,
      permissions: user.permissions,
      picture: user.picture,
      phone: user.phone || '',
      position: user.position || '',
      master: user.master || '',
      allergies: user.allergies || '',
      type: user.type_of_user,
    },
  }
}

export function getUserError() {
  return {
    type: GET_USER_ERROR,
  }
}

export const getUser = () => dispatch => {
  dispatch(getUserRequest())
  fetchUser()
    .then(user => dispatch(getUserSuccess(user)))
    .catch(() => dispatch(getUserError()))
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  }
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
  }
}

export function logout() {
  // TODO this will not work anymore
  removeToken()
  return {
    type: LOGOUT,
  }
}

export const login = (email, pass) => dispatch => {
  loginUser(email, pass)
    .then(user => {
      dispatch(getUserSuccess(user))
      dispatch(loginSuccess())
    })
    .catch(dispatch(loginError()))
}
