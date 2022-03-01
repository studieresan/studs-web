import {
  GET_POSTS_REQUEST_SUCCESS,
  GET_POSTS_REQUEST_FAIL,
  SAVE_NEW_POST,
} from './constants'
import { createBlogPost, getBlogPosts } from '../../api'
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

export const getPosts = () => dispatch => {
  getBlogPosts().then(posts => {
    // TODO: Kolla om det blev successfull
    dispatch(getPostsSuccess(posts))
  })
}

export const saveNewPost = post => dispatch => {
  createBlogPost({ ...post, date: new Date() }).then(post => {
    // TODO: Kolla om det blev successfull
    dispatch(saveSuccess(post))
  })
}
