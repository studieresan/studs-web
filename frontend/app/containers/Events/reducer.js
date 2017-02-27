/*
 *
 * Events reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  UPDATE,
} from './constants';

const initialState = fromJS({
  items: [{
    id: 3,
    company: 'Asdf',
    contact: 'Asdf',
    date: '17/03/20',
    location: 'Hello street',
    description: 'Lorem ipsum',
    beforeServey: 'hello',
    afterServey: 'asdf',
  }],
  saved: true,
});

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return state.merge(Map({
        event: Map(action.data),
        saved: true,
      }));
    case UPDATE:
      const index = state.get('items').findIndex(event => event.get('id') === action.id);
      const s = state.mergeIn(['items', index], Map(action.data));
      return s.merge(Map({saved: false}));
    default:
      return state;
  }
}

export default eventsReducer;
