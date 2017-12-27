/*
 *
 * User actions
 *
 */

import {
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_ERROR,
  UPDATE_PASSWORD,
} from './constants'
import { resetPassword } from '../../api'
import { browserHistory } from 'react-router-dom'

export function resetRequest() {
  return {
    type: RESET_REQUEST,
  }
}
export function resetSuccess() {
  return {
    type: RESET_SUCCESS,
  }
}

export function updatePassword(passwordChange) {
  return {
    type: UPDATE_PASSWORD,
    passwordChange,
  }
}

export function resetError() {
  return {
    type: RESET_ERROR,
  }
}

export const reset = token => (dispatch, getState) => {
  const { password, confirmPassword } = getState().get('passwordReset').toJS()

  dispatch(resetRequest())
  resetPassword(password, confirmPassword, token)
    .then(() => {
      dispatch(resetSuccess())
      browserHistory.push('/login')
    })
    .catch(() => dispatch(resetError()))
}
