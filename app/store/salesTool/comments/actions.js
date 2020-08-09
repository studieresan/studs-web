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
  fetchComments,
  updateComment as updateCommentApi,
  removeComment,
  createComment,
} from 'api'
import { setComments } from '../companies/actions'

export const getRequest = () => ({
  type: GET_REQUEST,
})

export const getSuccess = comments => ({
  type: GET_SUCCESS,
  payload: comments,
})

export const error = err => ({
  type: ERROR_ACTION,
  payload: err,
})

export const deleteRequest = () => ({
  type: DELETE_REQUEST,
})

export const deleteSuccess = commentId => ({
  type: DELETE_SUCCESS,
  payload: commentId,
})

export const updateRequest = () => ({
  type: UPDATE_REQUEST,
})

export const updateSuccess = comment => ({
  type: UPDATE_SUCCESS,
  payload: comment,
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
    .catch(() => dispatch(error('loading comments')))
}

export const updateComment = (commentId, text) => dispatch => {
  dispatch(updateRequest())
  updateCommentApi(commentId, text)
    .then(comment => dispatch(updateSuccess(comment)))
    .catch(() => dispatch(error('updating comment')))
}

export const deleteComment = (commentId, companyId) => (dispatch, getState) => {
  const newComments = getState()
    .getIn(['salesTool', 'companies', 'data', companyId, 'comments'])
    .filter(id => id !== commentId)
  dispatch(deleteRequest())
  removeComment(commentId)
    .then(() => {
      dispatch(setComments(newComments, companyId))
      dispatch(deleteSuccess(commentId))
    })
    .catch(() => dispatch(error('deleting comment')))
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
    .catch(() => dispatch(error('adding comment')))
}
