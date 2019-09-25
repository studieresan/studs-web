// statuses
export const INITIAL = 'INITIAL'
export const LOADING = 'LOADING'
export const UPDATING = 'UPDATING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const hasData = status => status === UPDATING || status === SUCCESS

// actions
export const GET_REQUEST = 'app/SalesTool/GET_REQUEST'
export const UPDATE_REQUEST = 'app/SalesTool/UPDATE_REQUEST'
export const GET_SUCCESS = 'app/SalesTool/GET_SUCCESS'
export const GET_ERROR = 'app/SalesTool/GET_ERROR'
