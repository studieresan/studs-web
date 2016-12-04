const baseUrl = 'https://api.studieresan.se';
const usersUrl = '/users';
const userUrl = usersUrl + '/me';
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
      'Authorization': 'Basic ' + token
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

export function fetchUsers() {
  return fetch(baseUrl+usersUrl, authHeader())
    .then(checkStatus)
    .then(parseJSON)
}
