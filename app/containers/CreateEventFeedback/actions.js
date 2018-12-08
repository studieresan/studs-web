export const SET_FEEDBACK = 'app/CreateEventFeedback/SET_FEEDBACK'

export function setFeedback(companyName, feedbackData) {
  return {
    type: SET_FEEDBACK,
    companyName,
    feedbackData,
  }
}
