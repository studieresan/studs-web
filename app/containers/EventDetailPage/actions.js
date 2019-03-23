import {
  GET_EVENTFEEDBACKFORMS_REQUEST,
  GET_EVENTFEEDBACKFORMS_SUCCESS,
  GET_EVENTFEEDBACKFORMS_ERROR,
} from './constants'
import { fetchEventForms } from '../../api'

const getEventFormsRequest = () => ({
  type: GET_EVENTFEEDBACKFORMS_REQUEST,
})

const getEventFormsSuccess = eventForms => ({
  type: GET_EVENTFEEDBACKFORMS_SUCCESS,
  eventForms,
})

const getEventFormsError = () => ({
  type: GET_EVENTFEEDBACKFORMS_ERROR,
})

export const getEventForms = (userId, eventId) => dispatch => {
  dispatch(getEventFormsRequest())
  fetchEventForms(userId, eventId)
    .then(eventForms => {
      dispatch(getEventFormsSuccess(eventForms))
    })
    .catch(() => dispatch(getEventFormsError()))
}
