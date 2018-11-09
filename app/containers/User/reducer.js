import { fromJS, Map } from 'immutable'
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  PASSWORD_SAVE_SUCCESS,
  SAVE_ERROR,
  PASSWORD_SAVE_ERROR,
} from './constants'

export const defaultUser = {
  firstName: '',
  lastName: '',
  phone: '',
  position: '',
  linkedIn: '',
  github: '',
  master: '',
  allergies: '',
  password: '',
  confirmPassword: '',
  permissions: [],
}

const initialState = fromJS({
  user: defaultUser,
  fetching: false,
  error: false,
  saved: false,
  saving: false,
  saveError: false,
  passwordSaveErrors: [],
})

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST:
      return state.set('fetching', true)
    case GET_SUCCESS:
      return state.merge(
        Map({
          user: Map(action.user),
          fetching: false,
          error: false,
        }),
      )
    case GET_ERROR:
      return state.merge(
        Map({
          fetching: false,
          error: true,
        }),
      )
    case UPDATE:
      return state.merge(
        Map({
          user: state.get('user').merge(Map(action.user)),
          saved: false,
        }),
      )
    case SAVE_REQUEST:
      return state.merge(
        Map({
          saving: true,
          error: false,
          passwordSaveErrors: [],
        }),
      )
    case SAVE_SUCCESS:
      return state.merge(
        Map({
          saved: true,
          saving: false,
          error: false,
          saveError: false,
        }),
      )
    case SAVE_ERROR:
      return state.merge(
        Map({
          saved: false,
          saving: false,
          saveError: true,
        }),
      )
    case PASSWORD_SAVE_SUCCESS:
      return state.merge(
        Map({
          saved: true,
          saving: false,
          saveError: false,
          passwordSaveErrors: [],
        }),
      )
    case PASSWORD_SAVE_ERROR:
      return state.merge(
        Map({
          saved: false,
          saving: false,
          saveError: true,
          passwordSaveErrors: [
            'Passwords must match and be longer than 4 characters',
          ],
        }),
      )
    default:
      return state
  }
}

export default userReducer
