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
      const users = data.map(user => {
        if (!user.profile || !user.cv)
          return undefined
        return {
          ...user.profile,
          cv: user.cv,
          id: `${user.profile.firstName}${user.profile.lastName}`.toLowerCase(),
        }
      })
      dispatch(getMembersSuccess(users))
    })
    .catch(() => dispatch(getMembersError()))
}

