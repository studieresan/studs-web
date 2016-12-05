/*
 *
 * Members reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_CV_REQUEST,
  GET_CV_SUCCESS,
  GET_CV_ERROR
} from './constants';

const initialState = fromJS({
  users: [],
  cv: null,
  fetching: false,
  error: false
});

function membersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS_REQUEST:
      return state.set('fetching', true);
    case GET_MEMBERS_SUCCESS:
      return state.merge(fromJS({
        users: action.users,
        fetching: false,
        error: false
      }));
    case GET_MEMBERS_ERROR:
      return state.merge(Map({
        fetching: false,
        error: true
      }));
    case GET_CV_REQUEST:
      return state.set('fetching', true);
    case GET_CV_SUCCESS:
      return state.merge(fromJS({
        cv: action.cv.content,
        fetching: false,
        error: false
      }));
    case GET_CV_ERROR:
      return state.merge(Map({
        fetching: false,
        error: true
      }));
    default:
      return state;
  }
}

export default membersReducer;
