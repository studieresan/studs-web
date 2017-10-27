/*
 *
 * Members actions
 *
 */

import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  GET_CV_REQUEST,
  GET_CV_SUCCESS,
  GET_CV_ERROR,
} from './constants';
import { fetchUsers, fetchCv } from '../../api';

export function getMembersRequest() {
  return {
    type: GET_MEMBERS_REQUEST,
  };
}

export function getMembersSuccess(users) {
  return {
    type: GET_MEMBERS_SUCCESS,
    users
  };
}

export function getMembersError() {
  return {
    type: GET_MEMBERS_ERROR
  };
}

export function getCvRequest() {
  return {
    type: GET_CV_REQUEST,
  };
}

export function getCvSuccess(cv) {
  return {
    type: GET_CV_SUCCESS,
    cv
  };
}

export function getCvError() {
  return {
    type: GET_CV_ERROR
  };
}

export const getUsers = () => dispatch => {
  // TODO fetch the users
  // dispatch(getMembersRequest());
  // fetchUsers()
  //   .then(data => {
  //     const users = data.users.map(u => {
  //       return {
  //         id: u.id,
  //         firstName: u.first_name,
  //         lastName: u.last_name,
  //         email: u.email,
  //         phone: u.phone || '',
  //         master: u.master,
  //         picture: u.picture
  //       };
  //     });
  //     dispatch(getMembersSuccess(users));
  //   })
  //   .catch(error => dispatch(getMembersError()));
};

export const getCv = id => dispatch => {
  dispatch(getCvRequest());
  fetchCv(id)
    .then(cv => dispatch(getCvSuccess(cv)))
    .catch(error => dispatch(getCvError()))
}
