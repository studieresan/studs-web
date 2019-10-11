import { GET_REQUEST, GET_SUCCESS, ERROR_ACTION } from './constants'
import { fetchUserRoles } from 'api'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = contacts => ({
  type: GET_SUCCESS,
  payload: contacts,
})

export const error = err => ({
  type: ERROR_ACTION,
  payload: err,
})

// thunks
export const loadUserRoles = () => dispatch => {
  dispatch(getRequest())
  fetchUserRoles()
    .then(userRoles => {
      const userRolesStateMap = {}
      userRoles.forEach(c => (userRolesStateMap[c] = c))
      dispatch(getSuccess(userRolesStateMap))
    })
    .catch(() => dispatch(error('loading user roles')))
}
