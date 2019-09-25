import {
  INITIAL,
  GET_REQUEST,
  UPDATING,
  GET_SUCCESS,
  SUCCESS,
  GET_ERROR,
  ERROR,
} from '../constants'

// reducer
const defaultState = {
  status: INITIAL,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
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
