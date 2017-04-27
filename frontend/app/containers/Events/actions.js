/*
 *
 * Events actions
 */
import {
  createEvent,
  updateEvent,
  fetchEvents,
  fetchCompanies,
  fetchUserEventForms,
  fetchMissingForms,
  notifyBefore,
  notifyAfter,
  importData,
} from '../../api';
import { browserHistory } from 'react-router';
import {
  UPDATE,
  GET_REQUEST,
  GET_SUCCESS,
  GET_ERROR,
  SAVE_REQUEST,
  SAVE_SUCCESS,
  SAVE_ERROR,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_ERROR,
  GET_COMPANIES,
  GET_MISSING_FORMS,
  REMINDED_BEFORE,
  REMINDED_AFTER,
  IMPORTED_DATA,
} from './constants';

function fromBackend(e) {
  let dateString;
  if(e.date) {
    const date = new Date(e.date);
    const month = date.getMonth()+1;
    const day = date.getDate();
    dateString = `${date.getFullYear()}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
  }
  let formData;
  if (e.formdata) {
    formData = {
      beforeInterest: parseData(e.formdata.before_interest),
      afterInterest: parseData(e.formdata.after_interest),
      knowDoes: parseData(e.formdata.knowdoes),
      qualified: parseData(e.formdata.qualified),
    };
  }
  return {
    id: e.id,
    companyName: e.company ? e.company.name : '',
    company: e.company ? e.company.id : '',
    contact: '',
    date: dateString || '',
    location: '',
    description: e.information || '',
    publicText: e.public_text || '',
    feedbackText: e.feedback_text || '',
    beforeSurvey: e.before_form_url || '',
    beforeSurveyId: e.before_form_id || '',
    beforeSurveyReplied: e.before_form_replied || false,
    afterSurvey: e.after_form_url || '',
    afterSurveyId: e.after_form_id || '',
    afterSurveyReplied: e.after_form_replied || false,
    formData,
  };
}

function parseData(data) {
  const count = Object.entries(data.reduce((acc, d) => {
    if (acc[d] !== undefined) {
      acc[d] += 1;
    } else {
      acc[d] = 0;
    }
    return acc;
  }, {})).sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });
  count.unshift(['key', 'count'])
  return count;
}

function toBackend(e) {
  return {
    company_id: e.company,
    date: new Date(e.date),
    information: e.description,
    feedback_text: e.feedbackText, public_text: e.publicText,
    before_form_url: e.beforeSurvey, after_form_url: e.afterSurvey, before_form_id: e.beforeSurveyId, after_form_id: e.afterSurveyId,
  };
}

export function update(event, id) {
  return {
    type: UPDATE,
    data: event,
    id: id
  };
}

export function getRequest() {
  return {
    type: GET_REQUEST,
  };
}

export function getSuccess(data) {
  return {
    type: GET_SUCCESS,
    data: data.events.map(e => {
      return fromBackend(e);
    }),
  };
}

export function getError(err) {
  console.log(err);
  return {
    type: GET_ERROR,
  };
}

export const get = () => dispatch => {
  dispatch(getRequest());
  fetchEvents()
    .then(events => dispatch(getSuccess(events)))
    .catch(err => dispatch(getError(err)))
}

export function saveRequest() {
  return {
    type: SAVE_REQUEST,
  };
}

export function saveSuccess(id) {
  console.log('save was successful');
  browserHistory.push('/events/' + id);
  return {
    type: SAVE_SUCCESS,
  };
}

export function saveError(err) {
  console.log(err);
  return {
    type: SAVE_ERROR,
  };
}

export const save = e => dispatch => {
  const data = toBackend(e);
  dispatch(saveRequest());
  updateEvent(e.id, data)
    .then(() => dispatch(saveSuccess(e.id)))
    .catch(err => dispatch(saveError(err)))
}

export function createRequest() {
  return {
    type: CREATE_REQUEST,
  };
}

export function createSuccess(e) {
  const data = fromBackend(e.event);
  browserHistory.push('/events/' + data.id);
  return {
    type: CREATE_SUCCESS,
    data: data,
  };
}

export function createError(err) {
  console.log(err);
  return {
    type: CREATE_ERROR,
  };
}

export const create = e => dispatch => {
  const data = toBackend(e);
  dispatch(createRequest());
  createEvent(data)
    .then(data => dispatch(createSuccess(data)))
    .catch(err => dispatch(createError(err)))
}

export const getCompanies = () => dispatch => {
  return fetchCompanies()
    .then(data => dispatch({
      type: GET_COMPANIES,
      data: data.companies,
    }))
    .catch(err => console.log(err))
}

export const getMissingForms = eventId => dispatch => {
  return fetchMissingForms(eventId)
    .then(data => dispatch({
      type: GET_MISSING_FORMS,
      id: eventId,
      data: data,
    }))
    .catch(err => console.log(err));
}

export const remindBefore = eventId => dispatch => {
  dispatch({
    type: REMINDED_BEFORE,
    id: eventId,
  })
  return notifyBefore(eventId)
    .then(() => console.log('reminded before'))
    .catch(err => console.log(err))
}

export const remindAfter = eventId => dispatch => {
  dispatch({
    type: REMINDED_AFTER,
    id: eventId,
  })
  return notifyAfter(eventId)
    .then(() => console.log('reminded after'))
    .catch(err => console.log(err))
}

export const importFormData = eventId => dispatch => {
  importData(eventId)
    .then(() => dispatch({type: IMPORTED_DATA, id: eventId}))
    .catch(err => console.log(err))
}
