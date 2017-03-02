import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from './constants'
import { fetchUser } from '../../api';
import { generateToken, setToken, removeToken } from '../../auth';

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST
  };
}

export function getUserSuccess(user) {
  console.log(user);
  return {
    type: GET_USER_SUCCESS,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      permissions: user.permissions,
      picture: user.picture,
      phone: user.phone || '',
      position: user.position || '',
      master: user.master || '',
      allergies: user.allergies || '',
      type: user.type_of_user,
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

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR
  }
}

export function logout() {
  removeToken();
  return {
    type: LOGOUT
  };
}

export const login = (email, pass) => dispatch => {
  const token = generateToken(email, pass);
  fetchUser(token)
    .then(data => {
      setToken(token);
      dispatch(getUserSuccess(data.user));
      dispatch(loginSuccess());
    }).catch(error => {
      dispatch(loginError());
    });
}
