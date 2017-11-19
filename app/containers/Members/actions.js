/*
 *
 * Members actions
 *
 */

import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
} from './constants'
import { fetchUsers } from '../../api'

export function getMembersRequest() {
  return {
    type: GET_MEMBERS_REQUEST,
  }
}

export function getMembersSuccess(users) {
  return {
    type: GET_MEMBERS_SUCCESS,
    users,
  }
}

export function getMembersError() {
  return {
    type: GET_MEMBERS_ERROR,
  }
}

export const getUsers = () => dispatch => {
  dispatch(getMembersRequest())
  fetchUsers()
    .then(data => {
      const users = data.map(u => {
        return {
          firstName: u.firstName,
          lastName: u.lastName,
          id: `${u.firstName}${u.lastName}`.toLowerCase(),
          email: u.email,
          phone: u.phone || '',
          master: u.master,
          picture: u.picture,
          cv: u.cv || null,
        }
      })
      dispatch(getMembersSuccess(users))
    })
    .catch(() => dispatch(getMembersError()))
}

