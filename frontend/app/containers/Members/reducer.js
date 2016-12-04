/*
 *
 * Members reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
} from './constants';

const initialState = fromJS({
  users: [],
  fetching: false,
  error: false
});

function membersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST:
      return state.set('fetching', true);
    case GET_SUCCESS:
      return state.merge(fromJS({
        users: action.users,
        fetching: false,
        error: false
      }));
    case GET_ERROR:
      return state.merge(Map({
        fetching: false,
        error: true
      }));
    default:
      return state;
  }
}

export default membersReducer;
