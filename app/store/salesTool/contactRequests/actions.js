import {
  GET_REQUEST,
  GET_SUCCESS,
  ERROR_ACTION,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
} from './constants'
import { fetchContactRequests } from 'api'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = contactRequests => ({
  type: GET_SUCCESS,
  payload: contactRequests,
})

export const error = err => {
  return {
    type: ERROR_ACTION,
    payload: err,
  }
}

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = contactRequest => ({
  type: UPDATE_SUCCESS,
  payload: contactRequest,
})

export const loadContactRequests = () => dispatch => {
  dispatch(getRequest())
  fetchContactRequests()
    .then(contactRequests => {
      dispatch(getSuccess(contactRequests))
    })
    .catch(() => {
      dispatch(error('loading contact requests'))
    })
}

// export const updateCompany = (companyId, body) => dispatch => {
//   dispatch(updateRequest())
//   updateCompanyApi(companyId, body)
//     .then(company => dispatch(updateSuccess(company)))
//     .catch(() => {
//       dispatch(error('updating company'))
//     })
// }
