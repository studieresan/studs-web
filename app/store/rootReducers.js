import global from 'containers/App/reducer'
import cv from 'containers/CvEdit/reducer'
import events from './events/reducer'
import oldEvents from './oldEvents/reducer'
import language from 'containers/LanguageProvider/reducer'
import passwordReset from 'containers/PasswordReset/reducer'
import members from 'containers/Members/reducer'
import user from 'containers/User/reducer'
import salesTool from './salesTool/reducer'

export default {
  global,
  members,
  cv,
  events,
  oldEvents,
  language,
  passwordReset,
  user,
  salesTool,
}
