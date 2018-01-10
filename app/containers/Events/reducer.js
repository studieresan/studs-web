import { fromJS, Map } from 'immutable'
import {
  GET_SUCCESS,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  UPDATE,
  CREATE_SUCCESS,
  NEW_EVENT,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_ERROR,
} from './constants'

const newEvent = {
  id: '',
  companyName: '',
  schedule: '',
  privateDescription: '',
  publicDescription: '',
  date: new Date(),
  beforeSurveys: '',
  afterSurveys: '',
  location: '',
  pictures: '',
}

const initialState = fromJS({
  items: [],
  newEvent: null,
  saved: false,
  saving: false,
  deleting: false,
  deleteError: false,
})

function eventsReducer(state = initialState, action) {
  let index
  switch (action.type) {
  case GET_SUCCESS:
    return state.merge(Map({
      items: fromJS(action.data),
      saved: true,
    }))
  case UPDATE: {
    let s
    if (action.id) {
      index =
         state.get('items').findIndex(event => event.get('id') === action.id)
      s = state.mergeIn(['items', index], Map(action.data))
    } else {
      s = state.mergeIn(['newEvent'], Map(action.data))
    }
    return s.set('saved', false)
  }
  case NEW_EVENT:
    return state.set('newEvent', fromJS(newEvent))
  case SAVE_REQUEST:
  case SAVE_SUCCESS:
    return state.set('saving', false)
      .set('saved', true)
  case CREATE_SUCCESS: {
    const event = fromJS(action.data)
    return state
      .update('items', items => items.push(event))
      .set('newEvent', null)
  }
  case DELETE_REQUEST:
    return state.set('deleting', true)
  case DELETE_SUCCESS:
    return state
      .set('deleteError', false)
      .set('deleting', false)
      .update('items', items => items.filter(e => e.get('id') !== action.id))
  case DELETE_ERROR:
    return state
      .set('deleteError', true)
      .set('deleting', false)
  default:
    return state
  }
}

export default eventsReducer
