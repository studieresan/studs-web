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
import { browserHistory } from 'react-router'

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

export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD,
    password,
  }
}

export function resetError() {
  return {
    type: RESET_ERROR,
  }
}

export const reset = token => (dispatch, getState) => {
  const { password } = getState().get('passwordReset').toJS()

  dispatch(resetRequest())
  resetPassword(password, password, token)
    .then(() => {
      dispatch(resetSuccess())
      browserHistory.push('/login')
    })
    .catch(() => dispatch(resetError()))
}
