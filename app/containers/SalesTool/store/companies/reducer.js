import {
  GET_REQUEST,
  UPDATE_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  SET_CONTACTS,
  SET_COMMENTS,
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
        ...state,
        status: LOADING,
      }
    case GET_SUCCESS:
      return {
        status: SUCCESS,
        data: { ...state.data, ...action.payload },
      }
    case GET_ERROR:
      return {
        ...state,
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
          [action.payload.id]: {
            ...state.data[action.payload.id],
            ...action.payload,
          },
        },
      }
    case UPDATE_ERROR: {
      return {
        ...state,
        status: ERROR,
      }
    }
    case SET_CONTACTS: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            contacts: action.payload.contacts,
          },
        },
      }
    }
    case SET_COMMENTS: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            comments: action.payload.comments,
          },
        },
      }
    }
    default:
      return state
  }
}

export default reducer
