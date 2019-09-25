import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
} from '../constants'
import { fetchCompanies, createCompany } from 'api'
// actions
export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = companies => ({
  type: GET_SUCCESS,
  payload: companies,
})

export const getError = () => ({
  type: GET_ERROR,
})

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = company => ({
  type: UPDATE_SUCCESS,
  payload: company,
})

export const updateError = () => ({
  type: UPDATE_ERROR,
})

// thunks
export const loadCompanies = () => dispatch => {
  dispatch(getRequest())
  fetchCompanies()
    .then(companies => {
      const companyStateMap = {}
      companies.forEach(c => (companyStateMap[c.id] = c))
      dispatch(getSuccess(companyStateMap))
    })
    .catch(() => dispatch(getError()))
}

export const addCompany = name => dispatch => {
  dispatch(updateRequest())
  createCompany(name)
    .then(company => dispatch(updateSuccess(company)))
    .catch(() => dispatch(updateError()))
}
