import {
  GET_REQUEST,
  GET_SUCCESS,
  ERROR_ACTION,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  SET_CONTACTS,
  SET_COMMENTS,
  SOLD_COMPANIES_SUCCESS,
} from './constants'
import {
  fetchCompanies,
  fetchSoldCompanies,
  createCompany,
  updateCompany as updateCompanyApi,
  fetchCompany,
} from 'api'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = companies => ({
  type: GET_SUCCESS,
  payload: companies,
})

export const soldCompaniesSuccess = soldCompanies => ({
  type: SOLD_COMPANIES_SUCCESS,
  payload: soldCompanies,
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

export const updateSuccess = company => ({
  type: UPDATE_SUCCESS,
  payload: company,
})

export const setContacts = (contacts, companyId) => ({
  type: SET_CONTACTS,
  payload: { contacts, id: companyId },
})

export const setComments = (comments, companyId) => ({
  type: SET_COMMENTS,
  payload: { comments, id: companyId },
})

// thunks
export const loadCompanies = () => dispatch => {
  dispatch(getRequest())
  fetchCompanies()
    .then(companies => {
      const companyStateMap = {}
      companies.forEach(c => {
        const yearMap = {}
        c.years.forEach(y => (yearMap[y.year] = y))
        c.years = yearMap
        companyStateMap[c.id] = c
      })
      dispatch(getSuccess(companyStateMap))
    })
    .catch(() => {
      dispatch(error('loading companies'))
    })
}

export const addCompany = name => dispatch => {
  dispatch(updateRequest())
  createCompany(name)
    .then(company => dispatch(updateSuccess(company)))
    .catch(() => {
      dispatch(error('adding company'))
    })
}

export const updateCompany = (companyId, studsYear, body) => dispatch => {
  dispatch(updateRequest())
  updateCompanyApi(companyId, studsYear, body)
    .then(company => dispatch(updateSuccess(company)))
    .catch(() => {
      dispatch(error('updating company'))
    })
}

export const loadCompany = (id, studsYear) => dispatch => {
  dispatch(getRequest())
  fetchCompany(id, studsYear)
    .then(company => {
      dispatch(getSuccess({ [company.id]: company }))
    })
    .catch(() => {
      dispatch(error('loading company'))
    })
}

export const loadSoldCompanies = () => dispatch => {
  dispatch(getRequest())
  Promise.all([
    fetchCompanies().then(companies => {
      const companyStateMap = {}
      companies.forEach(c => (companyStateMap[c.id] = c))
      dispatch(getSuccess(companyStateMap))
    }),
    fetchSoldCompanies().then(companies => {
      dispatch(soldCompaniesSuccess(companies.map(c => c.id)))
    }),
  ]).catch(() => {
    dispatch(error('loading sold companies'))
  })
}
