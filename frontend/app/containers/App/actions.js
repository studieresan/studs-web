import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGIN,
  LOGOUT,
} from './constants'
import { fetchUser } from '../../api';

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      picture: user.picture,
      phone: user.phone || '',
      position: user.position || '',
      master: user.master || '',
      allergies: user.allergies || '',
      type: user.type_of_user
    }
  };
}

export function getUserError() {
  return {
    type: GET_USER_ERROR
  };
}

export const getUser = () => dispatch => {
  dispatch(getUserRequest());
  fetchUser()
    .then(data => dispatch(getUserSuccess(data.user)))
    .catch(error => dispatch(getUserError()));
}

export function login() {
  return {
    type: LOGIN
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
