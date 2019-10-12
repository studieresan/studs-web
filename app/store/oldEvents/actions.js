import { fetchOldEvents } from 'api'
import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from './constants'

const actionType = (type, extras) => ({
  type,
  ...extras,
})

const getRequest = () => actionType(GET_REQUEST)
const getSuccess = data => actionType(GET_SUCCESS, { data })
const getError = err => {
  console.log(err)
  return actionType(GET_ERROR)
}

export const getOldEvents = () => dispatch => {
  dispatch(getRequest())
  fetchOldEvents()
    .then(events => dispatch(getSuccess(events)))
    .catch(err => dispatch(getError(err)))
}
