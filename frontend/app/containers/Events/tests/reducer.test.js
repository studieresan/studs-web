import expect from 'expect';
import eventsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('eventsReducer', () => {
  it('returns the initial state', () => {
    expect(eventsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
