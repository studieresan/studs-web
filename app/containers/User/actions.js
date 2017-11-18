import {
  GET_REQUEST,
  GET_SUCCESS, GET_ERROR, SAVE_REQUEST,
  SAVE_SUCCESS,
  PASSWORD_SAVE_SUCCESS,
  SAVE_ERROR,
  PASSWORD_SAVE_ERROR,
  UPDATE,
} from './constants'
import { fetchUser, updateUser, updateUserPassword } from '../../api'
import { setLoggedIn } from '../../auth'
import { getUserSuccess } from '../App/actions'
import differenceWith from 'lodash/differenceWith'
import toPairs from 'lodash/toPairs'
import isEqual from 'lodash/isEqual'
import fromPairs from 'lodash/fromPairs'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

export function getRequest() {
  return {
    type: GET_REQUEST,
  }
}

export function getSuccess(user) {
  return {
    type: GET_SUCCESS,
    user: {
      id: user.id,
      type: user.memberType,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      position: user.position || '',
      master: user.master || '',
      allergies: user.allergies || '',
    },
  }
}

export const getUser = () => dispatch => {
  dispatch(getRequest())
  fetchUser()
    .then(user => dispatch(getSuccess(user)))
    .catch(() => dispatch(getError()))
}

const savePassword = ({ password, confirmPassword }, dispatch) => {
  dispatch(update({ password: '', confirmPassword: '' }))
  dispatch(saveRequest())
  updateUserPassword({ password, confirmPassword })
    .then(() => dispatch(passwordSaveSuccess()))
    .catch(() => dispatch(passwordSaveError()))
}

export const save = (user) => (dispatch, getState) => {
  // Strip out any changes to the password since this is handled seperately
  if (user.password || user.confirmPassword) {
    savePassword(user, dispatch)
  }

  // Calculate changes made to the user and only send those
  const savedUser = getState().getIn(['global', 'user']).toJS()
  const localChanges = toPairs(omit(user, ['password', 'confirmPassword']))
  const diff = fromPairs(
    differenceWith(localChanges, toPairs(savedUser), isEqual)
  )
  if (isEmpty(diff)) return

  dispatch(saveRequest())
  updateUser(diff)
    .then(user => {
      dispatch(saveSuccess())
      dispatch(getSuccess(user))
      setLoggedIn()
      // Update the user globally
      dispatch(getUserSuccess(user))
    })
    .catch(() => dispatch(saveError()))
}

export function update(user) {
  return {
    type: UPDATE,
    user,
  }
}

function getError() {
  return {
    type: GET_ERROR,
  }
}


function saveRequest() {
  return {
    type: SAVE_REQUEST,
  }
}

function saveSuccess() {
  return {
    type: SAVE_SUCCESS,
  }
}

function passwordSaveSuccess() {
  return {
    type: PASSWORD_SAVE_SUCCESS,
  }
}

function passwordSaveError() {
  return {
    type: PASSWORD_SAVE_ERROR,
  }
}

function saveError() {
  return {
    type: SAVE_ERROR,
  }
}
