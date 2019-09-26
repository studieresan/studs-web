import {
  GET_REQUEST,
  GET_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  ERROR_ACTION,
} from './constants'
import {
  fetchContacts,
  updateContact as updateContactApi,
  removeContact,
  createContact,
} from 'api'
import { setContacts } from '../companies/actions'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = contacts => ({
  type: GET_SUCCESS,
  payload: contacts,
})

export const error = err => ({
  type: ERROR_ACTION,
  payload: err,
})

export const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

export const deleteSuccess = contactId => ({
  type: DELETE_SUCCESS,
  payload: contactId,
})

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = contact => ({
  type: UPDATE_SUCCESS,
  payload: contact,
})

// thunks
export const loadContacts = companyId => dispatch => {
  dispatch(getRequest())
  fetchContacts(companyId)
    .then(contacts => {
      const contactsStateMap = {}
      contacts.forEach(c => (contactsStateMap[c.id] = c))
      dispatch(setContacts(Object.keys(contactsStateMap), companyId))
      dispatch(getSuccess(contactsStateMap))
    })
    .catch(() => {
      dispatch(error('loading contacts'))
    })
}

export const updateContact = (contactId, body) => dispatch => {
  dispatch(updateRequest())
  updateContactApi(contactId, body)
    .then(contact => dispatch(updateSuccess(contact)))
    .catch(() => {
      dispatch(error('updating contacts'))
    })
}

export const deleteContact = (contactId, companyId) => (dispatch, getState) => {
  const newContacts = getState()
    .getIn(['salesTool', 'companies', 'data', companyId, 'contacts'])
    .filter(id => id !== contactId)
  dispatch(deleteRequest())
  removeContact(contactId)
    .then(() => {
      dispatch(setContacts(newContacts, companyId))
      dispatch(deleteSuccess(contactId))
    })
    .catch(() => {
      dispatch(error('deleting contacts'))
    })
}

export const addContact = (body, companyId) => (dispatch, getState) => {
  const oldContacts =
    getState().getIn([
      'salesTool',
      'companies',
      'data',
      companyId,
      'contacts',
    ]) || []
  dispatch(updateRequest())
  createContact(companyId, body)
    .then(contact => {
      dispatch(updateSuccess(contact))
      dispatch(setContacts(oldContacts.concat(contact.id), companyId))
    })
    .catch(() => {
      dispatch(error('adding contacts'))
    })
}
