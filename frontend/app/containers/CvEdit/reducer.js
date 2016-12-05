/*
 *
 * CvEdit reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  ADD_SECTION,
  UPDATE_SECTION,
  REMOVE_SECTION,
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
} from './constants';

const initialState = fromJS({
  fetchedCv: false,
  saved: false,
  content: {
    sections: [{
      title: 'Education',
      items: [{
        when: '',
        where: '',
        description: ''
      }]
    }, {
      title: 'Work Experience',
      items: [{
        when: '',
        where: '',
        description: ''
      }]
    }, {
      title: 'Extracurricular activities',
      items: [{
        when: '',
        where: '',
        description: ''
      }]
    }]
  },
});

function sectionReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      const item = Map({
        when: '',
        where: '',
        description: ''
      });
      return state.update('items', items => items.push(item));
    case UPDATE_ITEM:
      return state.updateIn(['items', action.index], item => item.merge(Map(action.item)));
    case REMOVE_ITEM:
      return state.removeIn(['items', action.index]);
    default:
      return state;
  }
}

function cvEditReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SECTION:
      const section = fromJS({
        title: '',
        items: [{
          when: '',
          where: '',
          description: '',
        }]
      });
      return state.updateIn(['content', 'sections'], sections => sections.push(section));
    case UPDATE_SECTION:
      return state.updateIn(['content', 'sections', action.index], section => section.merge(Map(action.section)));
    case REMOVE_SECTION:
      return state.removeIn(['content', 'sections', action.index]);
    case ADD_ITEM:
    case UPDATE_ITEM:
    case REMOVE_ITEM:
      return state.updateIn(['content', 'sections', action.section], s => sectionReducer(s, action));
    case GET_SUCCESS:
      if(!action.cv.content) {
        return state;
      }
      return state.set('content', fromJS(action.cv.content));
    default:
      return state;
  }
}

export default cvEditReducer;
