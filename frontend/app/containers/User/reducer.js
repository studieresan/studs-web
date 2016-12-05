/*
 *
 * User reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
} from './constants';

const initialState = fromJS({
  user: {
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    position: '',
    master: '',
    allergies: '',
    password: '',
    passwordConfirm: '',
  },
  fetching: false,
  error: false,
  saved: false,
  saving: false,
  saveError: false
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST:
      return state.set('fetching', true);
    case GET_SUCCESS:
      return state.merge(Map({
        user: Map(action.user),
        fetching: false,
        error: false
      }));
    case GET_ERROR:
      return state.merge(Map({
        fetching: false,
        error: true,
      }));
    case UPDATE:
      return state.merge(Map({ 
        user: state.get('user').merge(Map(action.user)),
        saved: false
      }));
    case SAVE_REQUEST:
      return state.set('saving', true);
    case SAVE_SUCCESS:
      return state.merge(Map({
        saved: true,
        saving: false
      }));
    case SAVE_ERROR:
      return state.merge(Map({
        saved: false,
        saving: false,
        saveError: true
      }));
    default:
      return state;
  }
}

export default userReducer;
