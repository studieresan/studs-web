import global from '../containers/App/reducer'
import cv from '../containers/CvEdit/reducer'
import events from './events/reducer'
import language from '../containers/LanguageProvider/reducer'
import passwordReset from '../containers/PasswordReset/reducer'
import members from '../containers/Members/reducer'
import user from '../containers/User/reducer'
import salesTool from './salesTool/reducer'
import userRoles from './userRoles/reducer'
import blog from 'containers/Blog/reducer'

export default {
  global,
  members,
  cv,
  events,
  language,
  passwordReset,
  user,
  salesTool,
  userRoles,
  blog,
}
