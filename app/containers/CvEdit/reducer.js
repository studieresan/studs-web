import { fromJS, Map } from 'immutable'
import {
  ADD_SECTION,
  UPDATE_SECTION,
  REMOVE_SECTION,
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  MOVE_ITEM,
  GET_SUCCESS,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
} from './constants'

const initialState = fromJS({
  fetchedCv: false,
  saved: true,
  saving: false,
  saveError: false,
  content: {},
})

function sectionReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const item = Map({
        when: '',
        title: '',
        organization: '',
        city: '',
        description: '',
      })
      return state.update('items', items => items.push(item))
    }
    case UPDATE_ITEM:
      return state.updateIn(['items', action.index], item =>
        item.merge(Map(action.item)),
      )
    case REMOVE_ITEM:
      return state.removeIn(['items', action.index])
    case MOVE_ITEM: {
      const oldItem = state.getIn(['items', action.fromIndex])
      return state.update('items', items =>
        items.splice(action.fromIndex, 1).splice(action.toIndex, 0, oldItem),
      )
    }
    default:
      return state
  }
}

function cvEditReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SECTION: {
      const section = fromJS({
        title: '',
        items: [
          {
            when: '',
            title: '',
            organization: '',
            city: '',
            description: '',
          },
        ],
      })
      return state.updateIn(['content', 'sections'], sections =>
        sections.push(section),
      )
    }
    case UPDATE_SECTION:
      state = state.set('saved', false)
      return state.updateIn(['content', 'sections', action.index], section =>
        section.merge(Map(action.section)),
      )
    case REMOVE_SECTION:
      state = state.set('saved', false)
      return state.removeIn(['content', 'sections', action.index])
    case ADD_ITEM:
    case UPDATE_ITEM:
    case REMOVE_ITEM:
    case MOVE_ITEM:
      state = state.set('saved', false)
      return state.updateIn(['content', 'sections', action.section], s =>
        sectionReducer(s, action),
      )
    case GET_SUCCESS:
      return state.set('content', fromJS(action.cv))
    case SAVE_REQUEST:
      return state.merge(
        Map({
          saving: true,
          saveError: false,
        }),
      )
    case SAVE_SUCCESS:
      return state.merge(
        Map({
          saving: false,
          saved: true,
          saveError: false,
        }),
      )
    case SAVE_ERROR:
      return state.merge(
        Map({
          saving: false,
          saveError: true,
        }),
      )
    default:
      return state
  }
}

export default cvEditReducer
