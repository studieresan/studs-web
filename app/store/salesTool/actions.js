import { UPDATE_FILTER, UPDATE_SORTING, SET_YEAR } from './constants'

export const updateFilter = newFilter => ({
  type: UPDATE_FILTER,
  payload: newFilter,
})

export const updateSorting = newSorting => ({
  type: UPDATE_SORTING,
  payload: newSorting,
})

export const setStudsYear = year => {
  return {
    type: SET_YEAR,
    payload: year,
  }
}
