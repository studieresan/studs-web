import { fromJS, Map } from 'immutable'
import {
  GET_POSTS_REQUEST_SUCCESS,
  GET_POSTS_REQUEST_FAIL,
  SAVE_NEW_POST,
  EDIT_POST_FIELD,
  ADD_PICTURE,
  REMOVE_PICTURE,
  REMOVE_FRONT_PICTURE,
  SAVE_POST_BY_ID,
  REMOVED_POST_SUCCESSFULLY,
  CLEAR_POST_FIELDS,
} from './constants'

const getEmptyPost = () => {
  return fromJS({
    id: '',
    author: '',
    title: '',
    description: '',
    pictures: [],
    date: '',
    frontPicture: '',
    published: false,
  })
}
const initialState = fromJS({
  posts: [],
  fetching: true,
  fetchFail: false,
  post: getEmptyPost(),
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
    case SAVE_POST_BY_ID: {
      const index = state
        .get('posts')
        .findIndex(post => post.get('id') === action.id)
      return state.updateIn(['posts', index], post =>
        post.merge(fromJS(action.post))
      )
    }
    case EDIT_POST_FIELD:
      return state.update('post', post => post.merge(Map(action.edit)))
    case ADD_PICTURE:
      return state.update('post', post =>
        post.update('pictures', pictures => pictures.push(action.url))
      )
    case REMOVE_PICTURE:
      return state.update('post', post =>
        post.update('pictures', pictures =>
          pictures.filter((item, index) => index !== action.index)
        )
      )
    case REMOVE_FRONT_PICTURE:
      return state.update('post', post => post.set('frontPicture', ''))

    case REMOVED_POST_SUCCESSFULLY:
      return state.update('posts', posts =>
        posts.filter((item, index) => item.id !== action.id)
      )
    case CLEAR_POST_FIELDS:
      return state.set('post', getEmptyPost())
    default:
      return state
  }
}

export default blogReducer
