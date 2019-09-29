import { GET_REQUEST, GET_SUCCESS, ERROR_ACTION } from './constants'
import { fetchSaleStatuses } from 'api'

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
export const loadStatuses = () => dispatch => {
  dispatch(getRequest())
  fetchSaleStatuses()
    .then(statuses => {
      for (let i = 0; i < statuses.length; ++i) {
        statuses[i]['color'] =
          'hsl(' +
          Math.round(100 - (i / (statuses.length - 1)) * 100) +
          ',100%,50%)'
      }
      const statusesStateMap = {}
      statuses.forEach(c => (statusesStateMap[c.id] = c))
      dispatch(getSuccess(statusesStateMap))
    })
    .catch(() => dispatch(error('loading statuses')))
}
