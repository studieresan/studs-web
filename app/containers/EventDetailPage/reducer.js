import {
  GET_EVENTFEEDBACKFORMS_REQUEST,
  GET_EVENTFEEDBACKFORMS_SUCCESS,
  GET_EVENTFEEDBACKFORMS_ERROR,
} from './constants'

const initialState = {
  isFetchingEventForms: false,
  isFetchingEventFormsSuccess: false,
  isFetchingEventFormsError: false,
  eventForms: [],
}

export default function eventFeedbackForm(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTFEEDBACKFORMS_REQUEST:
      return {
        ...state,
        isFetchingEventForms: true,
      }
    case GET_EVENTFEEDBACKFORMS_SUCCESS:
      return {
        ...state,
        isFetchingEventForms: false,
        isFetchingEventFormsSuccess: true,
        eventForms: action.eventForms,
      }
    case GET_EVENTFEEDBACKFORMS_ERROR:
      return {
        ...state,
        isFetchingEventForms: false,
        isFetchingEventFormsError: true,
      }
    default:
      return state
  }
}
