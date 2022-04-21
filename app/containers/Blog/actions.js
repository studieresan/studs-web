import {
  GET_POSTS_REQUEST_SUCCESS,
  GET_POSTS_REQUEST_FAIL,
  SAVE_NEW_POST,
  EDIT_POST_FIELD,
  ADD_PICTURE,
  REMOVE_PICTURE,
  REMOVE_FRONT_PICTURE,
  SAVE_POST_BY_ID,
  REMOVE_POST_FAILED,
  REMOVED_POST_SUCCESSFULLY,
} from './constants'
import {
  createBlogPost,
  getBlogPosts,
  updateBlogPost,
  deleteBlogpost,
} from '../../api'

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
  getBlogPosts()
    .then(posts => {
      dispatch(getPostsSuccess(posts))
    })
    .catch(e => {
      dispatch(getPostsError())
    })
}

export const savePost = obj => dispatch => {
  const post = obj.toJS()
  if (post.id === '') {
    createBlogPost(post)
      .then(post => {
        dispatch(saveSuccess(post))
      })
      .catch(e => {
        // todo
      })
  } else {
    const { id, ...postWithoutId } = post
    updateBlogPost(id, postWithoutId)
      .then(post => {
        dispatch({
          type: SAVE_POST_BY_ID,
          id,
          post,
        })
      })
      .catch(e => {
        // todo
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

export const removePost = id => dispatch => {
  deleteBlogpost(id).then(res => {
    console.log(res)
    if (res)
      dispatch({
        type: REMOVED_POST_SUCCESSFULLY,
      })
    else
      dispatch({
        type: REMOVE_POST_FAILED,
      })
  })
}
