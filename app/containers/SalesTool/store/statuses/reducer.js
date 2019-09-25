import { GET_REQUEST, GET_SUCCESS, GET_ERROR } from './constants'

import { LOADING, INITIAL, UPDATING, SUCCESS, ERROR } from '../constants'

// reducer
const defaultState = {
  status: INITIAL,
  data: {},
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        status: LOADING,
      }
    case GET_SUCCESS:
      return {
        status: SUCCESS,
        data: action.payload,
      }
    case GET_ERROR:
      return {
        ...state,
        status: ERROR,
      }
    default:
      return state
  }
}

export default reducer
