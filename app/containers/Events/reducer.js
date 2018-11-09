import { fromJS, Map } from 'immutable'
import {
  GET_SUCCESS,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  UPDATE,
  CREATE_SUCCESS,
  NEW_EVENT,
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_ERROR,
  ADD_PICTURE,
  REMOVE_PICTURE,
  ADD_SURVEY,
  REMOVE_SURVEY,
} from './constants'

const newEvent = {
  id: '',
  companyName: '',
  schedule: '',
  privateDescription: '',
  publicDescription: '',
  date: new Date(),
  beforeSurveys: [],
  afterSurveys: [],
  location: '',
  pictures: [],
  published: false,
}

const initialState = fromJS({
  items: [],
  newEvent: null,
  saved: false,
  saving: false,
  removing: false,
  removeError: false,
})

const updateEvent = (state, id, body) => {
  let s = state
  if (id) {
    const index = state.get('items').findIndex(event => event.get('id') === id)
    s = state.updateIn(['items', index], body)
  } else {
    s = state.update('newEvent', body)
  }
  return s.set('saved', false)
}

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return state.merge(
        Map({
          items: fromJS(action.data),
          saved: true,
        }),
      )
    case UPDATE:
      return updateEvent(state, action.id, event =>
        event.merge(Map(action.data)),
      )
    case NEW_EVENT:
      return state.set('newEvent', fromJS(newEvent))
    case SAVE_REQUEST:
    case SAVE_SUCCESS:
      return state.set('saving', false).set('saved', true)
    case CREATE_SUCCESS: {
      const event = fromJS(action.data)
      return state
        .update('items', items => items.push(event))
        .set('newEvent', null)
    }
    case REMOVE_REQUEST:
      return state.set('removing', true)
    case REMOVE_SUCCESS:
      return state
        .set('removeError', false)
        .set('removing', false)
        .update('items', items => items.filter(e => e.get('id') !== action.id))
    case REMOVE_ERROR:
      return state.set('removeError', true).set('removing', false)
    case ADD_PICTURE:
      return updateEvent(state, action.id, event =>
        event.update('pictures', pictures => pictures.push(action.url)),
      )
    case REMOVE_PICTURE:
      return updateEvent(state, action.id, event =>
        event.update('pictures', pictures =>
          pictures.filter((p, index) => index !== action.index),
        ),
      )
    case ADD_SURVEY:
      return updateEvent(state, action.id, event =>
        event.update(action.surveyType, surveys => surveys.push(action.url)),
      )
    case REMOVE_SURVEY:
      return updateEvent(state, action.id, event =>
        event.update(action.surveyType, survey =>
          survey.filter((p, index) => index !== action.index),
        ),
      )
    default:
      return state
  }
}

export default eventsReducer
