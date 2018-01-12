import {
  saveEvent,
  fetchEvents,
  deleteEventWithId,
} from 'api'
import {
  UPDATE,
  ADD_PICTURE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  CREATE_SUCCESS,
  NEW_EVENT,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_ERROR,
  REMOVE_PICTURE,
} from './constants'
import { push } from 'react-router-redux'

const actionType = (type, extras) => ({
  type,
  ...extras,
})

export const update = (data, id) => actionType(UPDATE, { data, id })

export const addPicture = (url, id) =>
  actionType(ADD_PICTURE, { url, id })

export const removePicture = (index, id) =>
  actionType(REMOVE_PICTURE, { index, id })

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

const deleteRequest = () => actionType(DELETE_REQUEST)
const deleteSuccess = (id) => actionType(DELETE_SUCCESS, { id })
const deleteError = () => actionType(DELETE_ERROR)

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
        dispatch(push(`/events/${data.id}/edit`))
      }
      dispatch(saveSuccess(data))
    })
    .catch(err => dispatch(saveError(err)))
}

export const deleteEvent = id => dispatch => {
  dispatch(deleteRequest())
  deleteEventWithId(id)
    .then(() => {
      dispatch(push('/events'))
      dispatch(deleteSuccess(id))
    })
    .catch(err => dispatch(deleteError(err)))
}

