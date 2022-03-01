import { fromJS, Map } from 'immutable'
import {
  GET_POSTS_REQUEST_SUCCESS,
  GET_POSTS_REQUEST_FAIL,
  SAVE_NEW_POST,
} from './constants'

const initialState = fromJS({
  posts: [],
  fetching: true,
  fetchFail: false,
})

function blogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_REQUEST_FAIL:
      return state.set('fetchFail', true)
    case GET_POSTS_REQUEST_SUCCESS:
      return state.merge(
        fromJS({
          fetching: false,
          posts: action.posts,
        })
      )
    case SAVE_NEW_POST:
      return state.update('posts', posts => posts.push(action.post))
    default:
      return state
  }
}

export default blogReducer
