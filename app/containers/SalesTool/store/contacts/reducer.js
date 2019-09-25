import {
  GET_REQUEST,
  UPDATE_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
} from './constants'

import { LOADING, INITIAL, UPDATING, SUCCESS, ERROR } from '../constants'

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
    case GET_SUCCESS:
      return {
        status: SUCCESS,
        data: action.payload,
      }
    case GET_ERROR:
      return {
        status: ERROR,
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        status: UPDATING,
      }
    case UPDATE_SUCCESS:
      return {
        status: SUCCESS,
        data: {
          ...state.data,
          [action.payload.id]: action.payload,
        },
      }
    case UPDATE_ERROR: {
      return {
        ...state,
        status: ERROR,
      }
    }
    default:
      return state
  }
}

export default reducer
