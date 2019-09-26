import {
  GET_REQUEST,
  GET_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  DELETE_REQUEST,
  ERROR_ACTION,
  DELETE_SUCCESS,
} from './constants'

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
        data: { ...state.data, ...action.payload },
      }
    case ERROR_ACTION:
      return {
        ...state,
        status: ERROR,
        error: action.payload,
      }
    case UPDATE_REQUEST:
    case DELETE_REQUEST:
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
    case DELETE_SUCCESS: {
      const newData = { ...state.data }
      delete newData[action.payload]
      return {
        status: SUCCESS,
        data: newData,
      }
    }
    default:
      return state
  }
}

export default reducer
