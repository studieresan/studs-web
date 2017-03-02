import { getToken } from './auth';

const baseUrl = 'https://api.studieresan.se';
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

export function fetchUser(token) {
  return fetch(baseUrl+userUrl, {
    headers: authHeader(token)
  }).then(checkStatus)
    .then(parseJSON)
}

export function updateUser(id, user) {
  return fetch(baseUrl+usersUrl+'/'+id, {
    ...header(),
    method: 'PATCH',
    body: user,
  }).then(checkStatus)
    .then(parseJSON)
}

export function updateUserPassword(user) {
  return fetch(baseUrl+passwordResetUrl, {
    method: 'PATCH',
    body: user,
  }).then(checkStatus)
    .then(parseJSON)
}

export function fetchUsers() {
  return fetch(baseUrl+usersUrl, header())
    .then(checkStatus)
    .then(parseJSON)
}

export function fetchCv(id) {
  return fetch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, header())
    .then(checkStatus)
    .then(parseJSON)
}

export function updateCv(id, cv) {
  return fetch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, {
    headers: {
      ...authHeader(),
      ...jsonHeader(),
    },
    method: 'PATCH',
    body: JSON.stringify(cv)
  }).then(checkStatus)
    .then(parseJSON)
}

export function requestPasswordReset(email) {
  return fetch(`${baseUrl}${passwordResetUrl}?email=${email}`)
    .then(checkStatus)
}

export function fetchEvents() {
  return fetch(baseUrl+eventsUrl, header())
    .then(checkStatus)
    .then(parseJSON)
}

export function updateEvent(id, event) {
  return fetch(`${baseUrl}${eventsUrl}/${id}`, {
    headers: {
      ...authHeader(),
      ...jsonHeader(),
    },
    method: 'PATCH',
    body: JSON.stringify(event)
  }).then(checkStatus)
    .then(parseJSON)
}

export function fetchCompanies() {
  return fetch(baseUrl+companiesUrl, header())
    .then(checkStatus)
    .then(parseJSON)
}

export function createEvent(event) {
  return fetch(`${baseUrl}${eventsUrl}`, {
    headers: {
      ...authHeader(),
      ...jsonHeader(),
    },
    method: 'POST',
    body: JSON.stringify(event)
  }).then(checkStatus)
    .then(parseJSON)
}
