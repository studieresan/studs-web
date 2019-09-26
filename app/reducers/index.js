import global from 'containers/App/reducer'
import cv from 'containers/CvEdit/reducer'
import events from 'containers/Events/reducer'
import language from 'containers/LanguageProvider/reducer'
import passwordReset from 'containers/PasswordReset/reducer'
import eventFeedback from 'containers/CreateEventFeedback/reducer'
import eventFeedbackForm from 'containers/EventDetailPage/reducer'
import members from 'containers/Members/reducer'
import user from 'containers/User/reducer'
import salesTool from 'containers/SalesTool/store/reducer'

export default {
  global,
  members,
  cv,
  events,
  language,
  passwordReset,
  eventFeedback,
  eventFeedbackForm,
  user,
  salesTool,
}
