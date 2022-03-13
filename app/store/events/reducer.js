import { fromJS, Map } from 'immutable'
import {
  GET_SUCCESS,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  UPDATE,
  CREATE_SUCCESS,
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_ERROR,
  ADD_PICTURE,
  REMOVE_PICTURE,
  SET_SURVEY,
} from './constants'

export function getEmptyEventObject() {
  return {
    privateDescription: '',
    publicDescription: '',
    date: new Date(),
    beforeSurvey: '',
    afterSurvey: '',
    location: '',
    pictures: [],
    published: false,
    company: {
      id: '',
      name: '',
    },
    responsible: {
      id: '',
    },
  }
}

const initialState = fromJS({
  items: [],
  newEvent: Map(getEmptyEventObject()),
  saved: false,
  saving: false,
  removing: false,
  removeError: false,
})

const updateEvent = (state, id, body) => {
  let s = state
  console.log(body)
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
        })
      )
    case UPDATE:
      return updateEvent(state, action.id, event =>
        event.merge(Map(action.data))
      )
    case SAVE_REQUEST:
    case SAVE_SUCCESS:
      return state.set('saving', false).set('saved', true)
    case CREATE_SUCCESS: {
      const event = fromJS(action.data)
      return state
        .update('items', items => items.push(event))
        .set('newEvent', Map(getEmptyEventObject()))
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
      return updateEvent(state, action.id, event => {
        return event.update('pictures', pictures => {
          pictures = fromJS(pictures)
          return pictures.push(action.url)
        })
      })
    case REMOVE_PICTURE:
      return updateEvent(state, action.id, event =>
        event.update('pictures', pictures =>
          pictures.filter((p, index) => index !== action.index)
        )
      )
    case SET_SURVEY:
      return updateEvent(state, action.id, event =>
        event.update(action.surveyType, () => action.url)
      )
    default:
      return state
  }
}

export default eventsReducer
