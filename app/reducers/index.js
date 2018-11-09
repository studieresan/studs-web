import global from 'containers/App/reducer'
import cv from 'containers/CvEdit/reducer'
import events from 'containers/Events/reducer'
import language from 'containers/LanguageProvider/reducer'
import passwordReset from 'containers/PasswordReset/reducer'
import members from 'containers/Members/reducer'
import user from 'containers/User/reducer'

export default {
  global,
  members,
  cv,
  events,
  language,
  passwordReset,
  user,
}
