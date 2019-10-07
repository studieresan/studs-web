import { UPDATE_FILTER, UPDATE_SORTING } from './constants'

export const updateFilter = newFilter => ({
  type: UPDATE_FILTER,
  payload: newFilter,
})

export const updateSorting = newSorting => ({
  type: UPDATE_SORTING,
  payload: newSorting,
})
