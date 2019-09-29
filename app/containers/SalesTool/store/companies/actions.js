import {
  GET_REQUEST,
  GET_SUCCESS,
  ERROR_ACTION,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  SET_CONTACTS,
  SET_COMMENTS,
} from './constants'
import {
  fetchCompanies,
  createCompany,
  updateCompany as updateCompanyApi,
  fetchCompany,
} from 'api'
import { hasData } from '../constants'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = companies => ({
  type: GET_SUCCESS,
  payload: companies,
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
      companies.forEach(c => (companyStateMap[c.id] = c))
      dispatch(getSuccess(companyStateMap))
    })
    .catch(() => {
      dispatch(error('loading companies'))
    })
}

export const addCompany = name => (dispatch, getState) => {
  const statuses = getState().getIn(['salesTool', 'statuses'])
  if (!hasData(statuses)) {
    dispatch(error('adding company'))
    returnget
  }
  let highestPrio = { id: null, priority: null }
  Object.keys(statuses.data).forEach(k => {
    if (statuses.data[k].priority > highestPrio) {
      highestPrio = statuses.data[k]
    }
  })
  if (highestPrio.id === null) {
    dispatch(error('adding company'))
    return
  }
  dispatch(updateRequest())
  createCompany(name, highestPrio.id)
    .then(company => dispatch(updateSuccess(company)))
    .catch(() => {
      dispatch(error('adding company'))
    })
}

export const updateCompany = (companyId, body) => dispatch => {
  dispatch(updateRequest())
  updateCompanyApi(companyId, body)
    .then(company => dispatch(updateSuccess(company)))
    .catch(() => {
      dispatch(error('updating company'))
    })
}

export const loadCompany = id => dispatch => {
  dispatch(getRequest())
  fetchCompany(id)
    .then(company => {
      dispatch(getSuccess({ [company.id]: company }))
    })
    .catch(() => {
      dispatch(error('loading company'))
    })
}
