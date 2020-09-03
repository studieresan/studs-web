import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  MEMBER_SELECTED,
} from './constants'
import { fetchUsers } from '../../api'
import { push } from 'react-router-redux'

const getMembersRequest = () => ({
  type: GET_MEMBERS_REQUEST,
})

const getMembersSuccess = users => ({
  type: GET_MEMBERS_SUCCESS,
  users,
})

const getMembersError = () => ({
  type: GET_MEMBERS_ERROR,
})

export const getUsers = studsYear => dispatch => {
  dispatch(getMembersRequest())
  const normalize = user => ({
    ...user.profile,
    cv: user.cv,
    realId: user.id,
    id: `${user.profile.firstName}${user.profile.lastName}`.toLowerCase(),
  })
  if (!studsYear) {
    studsYear = process.env.STUDS_YEAR
  }
  fetchUsers(studsYear)
    .then(users => {
      dispatch(getMembersSuccess(users.map(normalize)))
    })
    .catch(() => dispatch(getMembersError()))
}

export const selectMember = ({ id }) => dispatch => {
  dispatch({
    type: MEMBER_SELECTED,
    id: id,
  })
  dispatch(push('/members/' + id))
}
