import {
  GET_REQUEST,
  UPDATE_REQUEST,
  GET_SUCCESS,
  UPDATE_SUCCESS,
  ERROR_ACTION,
} from './constants'

import { LOADING, INITIAL, UPDATING, SUCCESS, ERROR } from '../constants'

// reducer
const defaultState = {
  status: INITIAL,
  data: [],
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
        ...state,
        status: SUCCESS,
        data: [...state.data, ...action.payload],
      }
    case ERROR_ACTION:
      return {
        ...state,
        status: ERROR,
        error: action.payload,
      }
    case UPDATE_REQUEST:
      return {
        ...state,
        status: UPDATING,
      }
    case UPDATE_SUCCESS:
      return {
        ...state,
        status: SUCCESS,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            ...action.payload,
          },
        },
      }

    default:
      return state
  }
}

export default reducer
