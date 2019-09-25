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
  fetchComments,
  updateContact as updateContactApi,
  removeContact,
  createContact,
} from 'api'
import { setComments } from '../companies/actions'
import { createComment } from '../../../../api'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = comments => ({
  type: GET_SUCCESS,
  payload: comments,
})

export const getError = () => ({
  type: GET_ERROR,
})

export const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

export const deleteSuccess = commentId => ({
  type: DELETE_SUCCESS,
  payload: commentId,
})

export const deleteError = () => ({
  type: DELETE_ERROR,
})

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = comment => ({
  type: UPDATE_SUCCESS,
  payload: comment,
})

export const updateError = () => ({
  type: UPDATE_ERROR,
})

// thunks
export const loadComments = companyId => dispatch => {
  dispatch(getRequest())
  fetchComments(companyId)
    .then(comments => {
      const commentsStateMap = {}
      comments.forEach(c => (commentsStateMap[c.id] = c))
      dispatch(setComments(Object.keys(commentsStateMap), companyId))
      dispatch(getSuccess(commentsStateMap))
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
  dispatch(deleteRequest())
  removeContact(contactId)
    .then(() => {
      dispatch(setComments(newContacts, companyId))
      dispatch(deleteSuccess(contactId))
    })
    .catch(() => dispatch(deleteError()))
}

export const addComment = (text, companyId) => (dispatch, getState) => {
  const oldComments =
    getState().getIn([
      'salesTool',
      'companies',
      'data',
      companyId,
      'comments',
    ]) || []
  dispatch(updateRequest())
  createComment(companyId, text)
    .then(comment => {
      dispatch(updateSuccess(comment))
      dispatch(setComments([comment.id].concat(oldComments), companyId))
    })
    .catch(() => dispatch(updateError()))
}
