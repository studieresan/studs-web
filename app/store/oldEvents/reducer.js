import { fromJS, Map } from 'immutable'
import { GET_SUCCESS } from './constants'

const initialState = fromJS({
  items: [],
})

function oldEventsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return state.merge(
        Map({
          items: fromJS(action.data),
        })
      )
    default:
      return state
  }
}

export default oldEventsReducer
