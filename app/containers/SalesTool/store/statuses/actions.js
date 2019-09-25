import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from './constants'
import { fetchSaleStatuses } from 'api'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = contacts => ({
  type: GET_SUCCESS,
  payload: contacts,
})

export const getError = () => ({
  type: GET_ERROR,
})

// thunks
export const loadStatuses = () => dispatch => {
  dispatch(getRequest())
  fetchSaleStatuses()
    .then(statuses => {
      const statusesStateMap = {}
      statuses.forEach(c => (statusesStateMap[c.id] = c.name))
      dispatch(getSuccess(statusesStateMap))
    })
    .catch(() => dispatch(getError()))
}
