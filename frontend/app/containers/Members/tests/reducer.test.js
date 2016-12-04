import expect from 'expect';
import membersReducer from '../reducer';
import { fromJS } from 'immutable';

describe('membersReducer', () => {
  it('returns the initial state', () => {
    expect(membersReducer(undefined, {})).toEqual(fromJS({}));
  });
});
