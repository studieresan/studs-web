const baseUrl = 'https://api.studieresan.se';
const usersUrl = '/users';
const passwordResetUrl = '/users/password_reset'
const userUrl = usersUrl + '/me';
const cvUrl = '/resume';
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

function authHeader(contentType = 'multipart/form-data') {
  const token = localStorage.token;
  console.log(token);
  return {
    headers: {
      'Authorization': 'Basic ' + token,
    }
  };
}

function headersJSON() {
  const token = localStorage.token;
  console.log(token);
  return {
    headers: {
      'Authorization': 'Basic ' + token,
      'Content-Type': 'application/json'
    }
  };
}

export function fetchUser() {
  return fetch(baseUrl+userUrl, authHeader())
    .then(checkStatus)
    .then(parseJSON)
}

export function updateUser(id, user) {
  return fetch(baseUrl+usersUrl+'/'+id, {
    ...authHeader(),
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
  return fetch(baseUrl+usersUrl, authHeader())
    .then(checkStatus)
    .then(parseJSON)
}

export function fetchCv(id) {
  return fetch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, authHeader())
    .then(checkStatus)
    .then(parseJSON)
}

export function updateCv(id, cv) {
  return fetch(`${baseUrl}${usersUrl}/${id}${cvUrl}`, {
    ...headersJSON(),
    method: 'PATCH',
    body: JSON.stringify(cv)
  }).then(checkStatus)
    .then(parseJSON)
}
