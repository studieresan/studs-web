import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_ERROR,
} from './constants'
import {
  fetchContacts,
  updateContact as updateContactApi,
  removeContact,
} from 'api'
import { setContacts } from '../companies/actions'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = contacts => ({
  type: GET_SUCCESS,
  payload: contacts,
})

export const getError = () => ({
  type: GET_ERROR,
})

export const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

export const deleteSuccess = contactId => ({
  type: DELETE_SUCCESS,
  payload: contactId,
})

export const deleteError = () => ({
  type: DELETE_ERROR,
})

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = contact => ({
  type: UPDATE_SUCCESS,
  payload: contact,
})

export const updateError = () => ({
  type: UPDATE_ERROR,
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
    .catch(() => dispatch(getError()))
}

export const updateContact = (contactId, body) => dispatch => {
  dispatch(updateRequest())
  updateContactApi(contactId, body)
    .then(contact => dispatch(updateSuccess(contact)))
    .catch(() => dispatch(updateError()))
}

export const deleteContact = (contactId, companyId) => (dispatch, getState) => {
  const newContacts = getState()
    .getIn(['salesTool', 'companies', 'data', companyId, 'contacts'])
    .filter(id => id !== contactId)
  dispatch(deleteRequest)
  removeContact(contactId)
    .then(() => {
      dispatch(setContacts(newContacts, companyId))
      dispatch(deleteSuccess(contactId))
    })
    .catch(() => dispatch(deleteError()))
}
