import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  SET_CONTACTS,
} from './constants'
import {
  fetchCompanies,
  createCompany,
  updateCompany as updateCompanyApi,
} from 'api'

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

export const setContacts = (contacts, companyId) => ({
  type: SET_CONTACTS,
  payload: { contacts, id: companyId },
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

export const updateCompany = (companyId, body) => dispatch => {
  dispatch(updateRequest())
  updateCompanyApi(companyId, body)
    .then(company => dispatch(updateSuccess(company)))
    .catch(() => dispatch(updateError()))
}
