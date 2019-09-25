import {
  INITIAL,
  GET_REQUEST,
  UPDATE_REQUEST,
  UPDATING,
  GET_SUCCESS,
  SUCCESS,
  GET_ERROR,
  ERROR,
  LOADING,
} from '../constants'

// reducer
const defaultState = {
  status: INITIAL,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
        status: LOADING,
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        status: UPDATING,
      }
    case GET_SUCCESS:
      return {
        status: SUCCESS,
        data: action.payload,
      }
    case GET_ERROR:
      return {
        status: ERROR,
      }
    default:
      return state
  }
}

export default reducer
