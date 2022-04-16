import { saveEvent, fetchEvents, removeEventWithId } from '../../api'
import {
  UPDATE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  CREATE_SUCCESS,
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_ERROR,
  ADD_PICTURE,
  REMOVE_PICTURE,
  SET_SURVEY,
} from './constants'
import { push } from 'react-router-redux'

const actionType = (type, extras) => ({
  type,
  ...extras,
})

export const update = (data, id) => actionType(UPDATE, { data, id })

export const addPicture = (url, id) => actionType(ADD_PICTURE, { url, id })

export const removePicture = (index, id) =>
  actionType(REMOVE_PICTURE, { index, id })

export const setSurvey = (url, surveyType, id) => {
  return actionType(SET_SURVEY, { url, surveyType, id })
}

const getRequest = () => actionType(GET_REQUEST)
const getSuccess = data => actionType(GET_SUCCESS, { data })
const getError = err => {
  console.log(err)
  return actionType(GET_ERROR)
}

const saveRequest = () => actionType(SAVE_REQUEST)
const saveSuccess = () => actionType(SAVE_SUCCESS)
const createSuccess = data => actionType(CREATE_SUCCESS, { data })
export const saveError = err => {
  console.log(err)
  return actionType(SAVE_ERROR)
}

const removeRequest = () => actionType(REMOVE_REQUEST)
const removeSuccess = id => actionType(REMOVE_SUCCESS, { id })
const removeError = () => actionType(REMOVE_ERROR)

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
        // creating a new event
        dispatch(createSuccess(data))
      }
      dispatch(saveSuccess(data))
      dispatch(push(`/events/${data.id}`))
    })
    .catch(err => dispatch(saveError(err)))
}

export const removeEvent = id => dispatch => {
  dispatch(removeRequest())
  removeEventWithId(id)
    .then(() => {
      dispatch(push('/events'))
      dispatch(removeSuccess(id))
    })
    .catch(err => dispatch(removeError(err)))
}
