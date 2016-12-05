import expect from 'expect';
import cvEditReducer from '../reducer';
import { fromJS } from 'immutable';

describe('cvEditReducer', () => {
  it('returns the initial state', () => {
    expect(cvEditReducer(undefined, {})).toEqual(fromJS({}));
  });
});
