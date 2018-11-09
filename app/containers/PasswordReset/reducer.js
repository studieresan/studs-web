import { fromJS, Map } from 'immutable'
import {
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_ERROR,
  UPDATE_PASSWORD,
} from './constants'

const initialState = fromJS({
  password: '',
  confirmPassword: '',
  success: false,
  resetting: false,
  error: false,
})

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return state.merge(action.passwordChange)
    case RESET_REQUEST:
      return state.set('resetting', true)
    case RESET_SUCCESS:
      return state.merge(
        Map({
          resetting: false,
          error: false,
          success: true,
        }),
      )
    case RESET_ERROR:
      return state.merge(
        Map({
          resetting: false,
          error: true,
        }),
      )
    default:
      return state
  }
}
