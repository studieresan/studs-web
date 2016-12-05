/*
 *
 * Members actions
 *
 */

import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
} from './constants';
import { fetchUsers } from '../../api';

export function getRequest() {
  return {
    type: GET_REQUEST,
  };
}

export function getSuccess(users) {
  return {
    type: GET_SUCCESS,
    users
  };
}

export function getError() {
  return {
    type: GET_ERROR
  };
}

export const getUsers = () => dispatch => {
  dispatch(getRequest());
  fetchUsers()
    .then(data => {
      const users = data.users.map(u => {
        return {
          id: u.id,
          firstName: u.first_name,
          lastName: u.last_name,
          email: u.email,
          phone: u.phone || '',
          picture: u.picture
        };
      });
      dispatch(getSuccess(users));
    })
    .catch(error => dispatch(getError()));
};
