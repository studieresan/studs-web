import { SET_FEEDBACK, SET_COMPANY_NAME } from './actions'
import template from './template'

const initialState = {
  companyName: '',
  feedbackData: [...template],
}

export default function eventFeedback(state = initialState, action) {
  switch (action.type) {
    case SET_FEEDBACK:
      return {
        companyName: action.companyName,
        feedbackData: action.feedbackData,
      }
    case SET_COMPANY_NAME:
      return {
        companyName: action.companyName,
        feedbackData: Object.assign([], state.feedbackData),
      }
    default:
      return state
  }
}
