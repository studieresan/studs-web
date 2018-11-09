import {
  ADD_SECTION,
  UPDATE_SECTION,
  REMOVE_SECTION,
  ADD_ITEM,
  MOVE_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
} from './constants'
import { fetchCv, updateCv } from '../../api'
import omit from 'lodash/omit'

export function addSection() {
  return {
    type: ADD_SECTION,
  }
}

export function updateSection(index, section) {
  return {
    type: UPDATE_SECTION,
    index,
    section,
  }
}

export function removeSection(index) {
  return {
    type: REMOVE_SECTION,
    index,
  }
}

export function addItem(section) {
  return {
    type: ADD_ITEM,
    section,
  }
}

export function moveItem(item, section, fromIndex, toIndex) {
  return {
    type: MOVE_ITEM,
    item,
    section,
    fromIndex,
    toIndex,
  }
}

export function updateItem(section, index, item) {
  return {
    type: UPDATE_ITEM,
    section,
    index,
    item,
  }
}

export function removeItem(section, index) {
  return {
    type: REMOVE_ITEM,
    section,
    index,
  }
}

export function getRequest() {
  return {
    type: GET_REQUEST,
  }
}

export function getSuccess(cv) {
  return {
    type: GET_SUCCESS,
    cv,
  }
}

export function getError() {
  return {
    type: GET_ERROR,
  }
}

export const getCv = id => dispatch => {
  dispatch(getRequest())
  fetchCv(id)
    .then(cv => dispatch(getSuccess(cv)))
    .catch(() => dispatch(getError()))
}

export function saveRequest() {
  return {
    type: SAVE_REQUEST,
  }
}

export function saveSuccess() {
  return {
    type: SAVE_SUCCESS,
  }
}

export function saveError() {
  return {
    type: SAVE_ERROR,
  }
}

let timeout = false
export const saveCv = id => (dispatch, getState) => {
  if (!timeout) {
    timeout = true
    dispatch(saveRequest())
    setTimeout(() => {
      timeout = false
      const content = getState()
        .getIn(['cv', 'content'])
        .toJS()
      updateCv(id, omit(content, 'userId'))
        .then(() => dispatch(saveSuccess()))
        .catch(() => dispatch(saveError()))
    }, 1000)
  }
}
