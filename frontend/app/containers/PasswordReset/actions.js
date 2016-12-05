/*
 *
 * User actions
 *
 */

import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  UPDATE
} from './constants';
import { updateUserPassword } from '../../api';
import { browserHistory } from 'react-router';

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getSuccess(user) {
  return {
    type: GET_SUCCESS,
    user: {
      password: user.password,
      token: user.token
    }
  };
}

export function getError() {
  return {
    type: GET_ERROR
  };
}

export const getUser = (token) => dispatch => {
  dispatch(getSuccess({token: token, password: ''}))
}

export function update(user) {
  return {
    type: UPDATE,
    user
  };
}

export function saveRequest() {
  return {
    type: SAVE_REQUEST
  };
}

export function saveSuccess() {
  return {
    type: SAVE_SUCCESS
  };
}

export function saveError() {
  return {
    type: SAVE_ERROR
  };
}

export const save = () => (dispatch, getState) => {
  const { user } = getState().get('user').toJS();
  const data = {
    password: user.password
  };

  const formData = new FormData();
  formData.append('token', user.token);
  Object.keys(data).forEach(function (key) {
    if (data[key]) {
      formData.append('user[' + key + ']', data[key]);
    }
  });

  dispatch(saveRequest());
  updateUserPassword(formData)
    .then(data => {
      dispatch(saveSuccess());
      browserHistory.push('/login');
    })
    .catch(error => dispatch(saveError()))
}
