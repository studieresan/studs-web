/*
 *
 * Events actions
 */
import { createEvent, updateEvent, fetchEvents, fetchCompanies, fetchUserEventForms } from '../../api';
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
  GET_USER_EVENT_FORMS,
} from './constants';

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
      let dateString;
      if(e.date) {
        const date = new Date(e.date);
        const month = date.getMonth()+1;
        const day = date.getDate();
        dateString = `${date.getFullYear()}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
      }
      return {
        id: e.id,
        companyName: e.company.name || '',
        company: e.company.id,
        contact: '',
        date: dateString || '',
        location: '',
        description: e.information || '',
        beforeSurvey: e.before_form_url || '',
        beforeSurveyId: e.before_form_id || '',
        beforeSurveyReplied: e.before_form_replied || false,
        afterSurvey: e.after_form_url || '',
        afterSurveyId: e.after_form_id || '',
        afterSurveyReplied: e.after_form_replied || false,
    }}),
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
  const data = {
    company_id: e.company,
    date: new Date(e.date),
    information: e.description,
    before_form_url: e.beforeSurvey,
    after_form_url: e.afterSurvey,
    before_form_id: e.beforeSurveyId,
    after_form_id: e.afterSurveyId,
  };
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

export function createSuccess(event) {
  const e = event.event;
  let dateString;
  if(e.date) {
    const date = new Date(e.date);
    const month = date.getMonth()+1;
    const day = date.getDate();
    dateString = `${date.getFullYear()}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
  }
  const data = {
    id: e.id,
    companyName: e.company.name || '',
    company: e.company.id,
    contact: '',
    date: dateString || '',
    location: '',
    description: e.information || '',
    beforeSurvey: e.before_form_url || '',
    beforeSurveyId: e.before_form_id || '',
    beforeSurveyReplied: e.before_form_replied || false,
    afterSurvey: e.after_form_url || '',
    afterSurveyId: e.after_form_id || '',
    afterSurveyReplied: e.after_form_replied || false,
  };
  browserHistory.push('/events/' + e.id);
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
  const data = {
    company_id: e.company,
    date: new Date(e.date),
    information: e.description,
    before_form_url: e.beforeSurvey,
    after_form_url: e.afterSurvey,
    before_form_id: e.beforeSurveyId,
    after_form_id: e.afterSurveyId,
  };
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
