export const SET_FEEDBACK = 'app/CreateEventFeedback/SET_FEEDBACK'
export const SET_COMPANY_NAME = 'app/CreateEventFeedback/SET_COMPANY_NAME'

export function setFeedback(companyName, feedbackData) {
  return {
    type: SET_FEEDBACK,
    companyName,
    feedbackData,
  }
}

export function setFeedbackCompanyName(companyName) {
  return {
    type: SET_COMPANY_NAME,
    companyName,
  }
}
