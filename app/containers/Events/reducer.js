import { fromJS, Map } from 'immutable'
import {
  GET_SUCCESS,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  UPDATE,
  CREATE_SUCCESS,
  NEW_EVENT,
} from './constants'

const newEvent = {
  id: '',
  companyName: '',
  schedule: '',
  privateDescription: '',
  publicDescription: '',
  date: '',
  beforeSurveys: '',
  afterSurveys: '',
  location: '',
  pictures: '',
}

const initialState = fromJS({
  items: [],
  newEvent: newEvent,
  saved: true,
  saving: false,
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
    return s.merge(Map({saved: false}))
  }
  case NEW_EVENT:
    return state.set('newEvent', fromJS(newEvent))
  case SAVE_REQUEST:
  case SAVE_SUCCESS:
    return state.set('saving', false)
  case CREATE_SUCCESS: {
    const event = fromJS(action.data)
    return state
      .update('items', items => items.push(event))
      .set('newEvent', event)
  }
  default:
    return state
  }
}

export default eventsReducer
