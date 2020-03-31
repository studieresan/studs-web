// statuses
export const INITIAL = 'INITIAL'
export const LOADING = 'LOADING'
export const UPDATING = 'UPDATING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const hasData = state =>
  state.status === UPDATING || state.status === SUCCESS
export const isInitial = state => state.status === INITIAL
export const isLoading = state => state.status === LOADING
export const isUpdating = state => state.status === UPDATING
export const isSuccess = state => state.status === SUCCESS
export const isError = state => state.status === ERROR

// actions
export const UPDATE_FILTER = 'app/SalesTool/Filter/UPDATE'
export const UPDATE_SORTING = 'app/SalesTool/Sorting/UPDATE'
export const SET_YEAR = 'app/SalesTool/Year/SET'
