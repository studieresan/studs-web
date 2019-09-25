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
export const GET_REQUEST = 'app/SalesTool/GET_REQUEST'
export const GET_SUCCESS = 'app/SalesTool/GET_SUCCESS'
export const GET_ERROR = 'app/SalesTool/GET_ERROR'
export const UPDATE_REQUEST = 'app/SalesTool/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'app/SalesTool/UPDATE_SUCCESS'
export const UPDATE_ERROR = 'app/SalesTool/UPDATE_ERROR'
