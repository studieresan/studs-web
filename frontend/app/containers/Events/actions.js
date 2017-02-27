/*
 *
 * Events actions
 *
 */
import { fetchEvents } from '../../api';
import {
  UPDATE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
} from './constants';

export function update(event) {
  return {
    type: UPDATE,
    data: event,
  };
}

export function getRequest() {
  return {
    type: GET_REQUEST,
  };
}

export function getSuccess(data) {
  console.log(data);
  return {
    type: GET_SUCCESS,
    data: data,
  };
}

export function getError(err) {
  console.log(err);
  return {
    type: GET_ERROR,
  };
}

export const get = () => dispatch => {
  dispatch(getRequest());
  fetchEvents()
    .then(events => dispatch(getSuccess(events)))
    .catch(err => dispatch(getError(err)))
}
