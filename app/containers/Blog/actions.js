import {
  GET_POSTS_REQUEST_SUCCESS,
  GET_POSTS_REQUEST_FAIL,
  SAVE_NEW_POST,
  EDIT_POST_FIELD,
  ADD_PICTURE,
  REMOVE_PICTURE,
  REMOVE_FRONT_PICTURE,
  SAVE_POST_BY_ID,
} from './constants'
import { createBlogPost, getBlogPosts, updateBlogPost } from '../../api'

const getPostsSuccess = posts => ({
  type: GET_POSTS_REQUEST_SUCCESS,
  posts,
})

const getPostsError = () => ({
  type: GET_POSTS_REQUEST_FAIL,
})

const saveSuccess = post => ({
  type: SAVE_NEW_POST,
  post,
})

const removeProp = prop => ({ [prop]: _, ...rest }) => ({ ...rest })

export const getPosts = () => dispatch => {
  getBlogPosts().then(posts => {
    // TODO: Kolla om det blev successfull
    dispatch(getPostsSuccess(posts))
  })
}

export const savePost = obj => dispatch => {
  const post = obj.toJS()
  if (post.id === '') {
    createBlogPost(post).then(post => {
      dispatch(saveSuccess(post))
    })
  } else {
    const { id, ...postWithoutId } = post
    updateBlogPost(id, postWithoutId).then(post => {
      dispatch({
        type: SAVE_POST_BY_ID,
        id,
        post,
      })
    })
  }
}

export const addPicture = url => dispatch => {
  dispatch({
    type: ADD_PICTURE,
    url,
  })
}

export const editPost = edit => dispatch => {
  dispatch({
    type: EDIT_POST_FIELD,
    edit,
  })
}

export const removePicture = index => dispatch => {
  dispatch({
    type: REMOVE_PICTURE,
    index,
  })
}

export const removeFrontPicture = () => dispatch => {
  dispatch({
    type: REMOVE_FRONT_PICTURE,
  })
}
