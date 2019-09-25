import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from '../constants'
import { fetchCompanies } from 'api'
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
