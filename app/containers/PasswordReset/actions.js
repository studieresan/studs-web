import {
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_ERROR,
  UPDATE_PASSWORD,
} from './constants'
import { resetPassword } from '../../api'
import { push } from 'react-router-redux'

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

export function resetError(e) {
  return {
    type: RESET_ERROR,
    errorMsg: e.error,
  }
}

export const reset = token => (dispatch, getState) => {
  const { password, confirmPassword } = getState().get('passwordReset').toJS()

  dispatch(resetRequest())
  resetPassword(password, confirmPassword, token)
    .then(() => {
      dispatch(resetSuccess())
      dispatch(push('/login'))
    })
    .catch(e => {
      e.json().then(e => dispatch(resetError(e)))
    })
}
