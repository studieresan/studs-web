import { fromJS, Map } from 'immutable';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants'

const initialState = fromJS({
  user: null,
  fetchingUser: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state.set('fetchingUser', true);
    case GET_USER_SUCCESS:
      return state.merge(Map({
        user: Map(action.user),
        fetchingUser: false,
      }));
    case GET_USER_ERROR:
      return state.merge(Map({
        fetchingUser: false,
      }));
    default:
      return state;
  }
}

export default reducer;
