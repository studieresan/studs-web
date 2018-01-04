import {
  saveEvent,
  fetchEvents,
} from 'api'
import {
  UPDATE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  CREATE_SUCCESS,
  NEW_EVENT,
} from './constants'

const actionType = (type, extras) => ({
  type,
  ...extras,
})

export const update = (data, id) => actionType(UPDATE, { data, id })

export const createNewEvent = () => actionType(NEW_EVENT)

const getRequest = () => actionType(GET_REQUEST)
const getSuccess = (data) => actionType(GET_SUCCESS, { data })
const getError = (err) => {
  console.log(err)
  return actionType(GET_ERROR)
}

const saveRequest = () => actionType(SAVE_REQUEST)
const saveSuccess = () => actionType(SAVE_SUCCESS)
const createSuccess = data => actionType(CREATE_SUCCESS, { data })
export const saveError = (err) => {
  console.log(err)
  return actionType(SAVE_ERROR)
}

export const getEvents = () => dispatch => {
  dispatch(getRequest())
  fetchEvents()
    .then(events => dispatch(getSuccess(events)))
    .catch(err => dispatch(getError(err)))
}

export const save = event => dispatch => {
  dispatch(saveRequest())
  saveEvent(event)
    .then(data => {
      if (!event.id) {
        dispatch(createSuccess(data))
      }
      dispatch(saveSuccess(data))
    })
    .catch(err => dispatch(saveError(err)))
}

