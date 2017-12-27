import expect from 'expect'
import userReducer from '../reducer'
import { fromJS } from 'immutable'

describe('userReducer', () => {
  it('returns the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(fromJS({}))
  })
})
