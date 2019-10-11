import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  SET_NAVBAR_BACKGROUND,
  SET_PRINT_MODE,
} from './constants'
import { fetchUser, loginUser } from 'api'
import { setLoggedOut, setLoggedIn } from 'auth'
import { push } from 'react-router-redux'

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
      firstName: user.firstName,
      lastName: user.lastName,
      permissions: user.permissions,
      picture: user.picture,
      phone: user.phone || '',
      position: user.position || '',
      linkedIn: user.linkedIn || '',
      github: user.github || '',
      master: user.master || '',
      allergies: user.allergies || '',
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
    .catch(err => {
      if (err.status === 403) {
        dispatch(logout())
        dispatch(push('/login'))
      }
      dispatch(getUserError())
    })
}

export function loginSuccess(jwtToken) {
  setLoggedIn(jwtToken)
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
  setLoggedOut()
  return {
    type: LOGOUT,
  }
}

export function setPrintMode(printMode) {
  return {
    type: SET_PRINT_MODE,
    payload: printMode,
  }
}

export const login = (email, pass) => dispatch => {
  loginUser(email, pass)
    .then(user => {
      dispatch(getUserSuccess(user))
      dispatch(loginSuccess(user.token))
    })
    .catch(() => dispatch(loginError()))
}

export function setNavbarBackground(value) {
  return {
    type: SET_NAVBAR_BACKGROUND,
    payload: value,
  }
}
