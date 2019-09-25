// statuses
export const INITIAL = 'INITIAL'
export const LOADING = 'LOADING'
export const UPDATING = 'UPDATING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const hasData = state =>
  state.status === UPDATING || state.status === SUCCESS
export const isLoading = state => state.status === LOADING
export const isUpdating = state => state.status === UPDATING
export const isSuccess = state => state.status === SUCCESS

// actions
export const UPDATE_FILTER = 'app/SalesTool/Filter/UPDATE'
