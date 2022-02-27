import { GET_POSTS_REQUEST_SUCCESS, GET_POSTS_REQUEST_FAIL } from './constants'

const getPostsSuccess = posts => ({
  type: GET_POSTS_REQUEST_SUCCESS,
  posts,
})

const getMembersError = () => ({
  type: GET_POSTS_REQUEST_FAIL,
})

export const getPosts = () => dispatch => {
  //TO DO: Try fetching posts
  const posts = ['My first post']
  dispatch(getPostsSuccess(posts))
}
