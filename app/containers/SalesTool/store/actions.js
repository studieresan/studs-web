import { UPDATE_FILTER } from './constants'

export const updateFilter = newFilter => ({
  type: UPDATE_FILTER,
  payload: newFilter,
})
