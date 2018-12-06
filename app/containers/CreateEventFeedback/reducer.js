import { SET_FEEDBACK } from './actions'

const initialState = {
  companyName: '',
  feedbackData: [],
}

export default function eventFeedback(state = initialState, action) {
  switch (action.type) {
    case SET_FEEDBACK:
      return {
        companyName: action.companyName,
        feedbackData: action.feedbackData,
      }
    default:
      return state
  }
}
