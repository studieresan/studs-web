import { GET_REQUEST, GET_SUCCESS, ERROR_ACTION } from './constants'
import { fetchContactRequests } from 'api'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = contactRequests => ({
  type: GET_SUCCESS,
  payload: contactRequests,
})

export const error = err => {
  return {
    type: ERROR_ACTION,
    payload: err,
  }
}

export const loadContactRequests = () => dispatch => {
  dispatch(getRequest())
  fetchContactRequests()
    .then(contactRequests => {
      dispatch(getSuccess(contactRequests))
    })
    .catch(() => {
      dispatch(error('loading contact requests'))
    })
}
