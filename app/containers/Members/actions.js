import {
  GET_MEMBERS_REQUEST,
  GET_MEMBERS_SUCCESS,
  GET_COMPANY_MEMBERS_SUCCESS,
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

const getCompanyMembersSuccess = users => ({
  type: GET_COMPANY_MEMBERS_SUCCESS,
  users,
})

const getMembersError = () => ({
  type: GET_MEMBERS_ERROR,
})

export const getUsers = () => dispatch => {
  dispatch(getMembersRequest())
  const normalize = user => ({
    ...user.profile,
    cv: user.cv,
    id: `${user.profile.firstName}${user.profile.lastName}`.toLowerCase(),
  })
  fetchUsers()
    .then(({ studsUsers, companyUsers }) => {
      dispatch(getMembersSuccess(studsUsers.map(normalize)))
      dispatch(getCompanyMembersSuccess(companyUsers.map(normalize)))
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
