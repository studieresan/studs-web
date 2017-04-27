import { getToken } from './auth';

// const baseUrl = 'https://api.studieresan.se';
const baseUrl = 'http://localhost:3333';
const usersUrl = '/users';
const passwordResetUrl = '/users/password-reset'
const userUrl = usersUrl + '/me';
const cvUrl = '/resume';
const eventsUrl = '/events';
const companiesUrl = '/companies';
const userEventFormsUrl = '/user_event_forms/mine';
const STATUS_OK = 200;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function authHeader(token) {
  token = token || getToken();
  return {
    'Authorization': 'Basic ' + token,
  };
}

function jsonHeader() {
  return {
    'Content-Type': 'application/json'
  };
}

function header() {
  return {
    headers: authHeader()
  };
}

function ftch(...args) {
  return fetch(...args)
    .then(checkStatus)
    .then(parseJSON);
}

export function fetchUser(token) {
  return ftch(baseUrl+userUrl, {
    headers: authHeader(token)
  })
}

export function updateUser(id, user) {
  return ftch(baseUrl+usersUrl+'/'+id, {
    ...header(),
    method: 'PATCH',
    body: user,
  });
}

export function updateUserPassword(user) {
  return ftch(baseUrl+passwordResetUrl, {
    method: 'PATCH',
    body: user,
  });
}

export function fetchUsers() {
  return ftch(baseUrl+usersUrl, header());
}

export function fetchCv(id) {
  return ftch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, header());
}

export function updateCv(id, cv) {
  return ftch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, {
    headers: {
      ...authHeader(),
      ...jsonHeader(),
    },
    method: 'PATCH',
    body: JSON.stringify(cv)
  });
}

export function requestPasswordReset(email) {
  return ftch(`${baseUrl}${passwordResetUrl}?email=${email}`);
}

export function fetchEvents() {
  return ftch(baseUrl+eventsUrl, header());
}

export function updateEvent(id, event) {
  return ftch(`${baseUrl}${eventsUrl}/${id}`, {
    ...header(),
    method: 'PATCH',
    body: event
  });
}

export function fetchCompanies() {
  return ftch(baseUrl+companiesUrl, header());
}

export function createEvent(event) {
  return ftch(`${baseUrl}${eventsUrl}`, {
    headers: {
      ...authHeader(),
      ...jsonHeader(),
    },
    method: 'POST',
    body: JSON.stringify(event)
  });
}

export function fetchMissingForms(eventId) {
  return ftch(`${baseUrl}${eventsUrl}/${eventId}/missing_forms`, header());
}

export function notifyBefore(eventId) {
  return ftch(`${baseUrl}${eventsUrl}/${eventId}/notify_before`, header());
}

export function notifyAfter(eventId) {
  return ftch(`${baseUrl}${eventsUrl}/${eventId}/notify_after`, header());
}

export function importData(eventId) {
  return fetch(`${baseUrl}${eventsUrl}/${eventId}/import_formdata`, header()).then(checkStatus);
}

