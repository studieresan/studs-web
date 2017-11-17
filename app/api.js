const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5040'
const graphqlUrl = '/graphql'
const usersUrl = '/users'
const loginUrl = '/login'
const PASSWORD_RESET = '/account/password'
// const cvUrl = '/resume'
const eventsUrl = '/events'
const companiesUrl = '/companies'
const STATUS_OK = 200

function checkStatus(response) {
  if (response.status >= STATUS_OK && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
function parseJSON(response) {
  return response.json()
}

function credentials() {
  return {
    credentials: 'include',
  }
}

function jsonHeader() {
  return {
    'Content-Type': 'application/json',
  }
}

function header() {
  return {
    // headers: authHeader(), TODO
  }
}

function ftch(...args) {
  return fetch(...args)
    .then(checkStatus)
    .then(parseJSON)
}

const USER_FIELDS = `
  memberType
  email
  firstName
  lastName
  phone
  picture
  allergies
  master
  position
`

export function fetchUser() {
  // TODO extract constants
  const query = `{
    user { ${USER_FIELDS} }
  }
  `
  const url = `${BASE_URL}${graphqlUrl}?query=${query}`
  return ftch(url, { ...credentials() })
    .then(res => Promise.resolve(res.data.user))
}

function toGraphQLFields(str) {
  return JSON.stringify(str).replace(/"([^"]*)":/g, '$1:')
}

export function updateUser(newFields) {
  const mutation = `mutation {
    setUser(fields: ${toGraphQLFields(newFields)}) {
      ${USER_FIELDS}
    }
  }
  `
  const url = `${BASE_URL}${graphqlUrl}?query=${mutation}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
  }).then(res => Promise.resolve(res.data.setUser))
}

export function loginUser(email, password) {
  const data = {
    email,
    password,
  }
  const post = {
    method: 'POST',
    ...credentials(),
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify(data),
  }
  return ftch(BASE_URL+loginUrl, post)
}

export function updateUserPassword({ password, confirmPassword }) {
  const post = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  }
  return ftch(BASE_URL+PASSWORD_RESET, post)
}

export function fetchUsers() {
  return ftch(BASE_URL+usersUrl, header())
}

const CV_FIELDS = `
  userId
  sections {
    title
    items {
      title
      description
      when
      organization
      city
    }
  }
`

export function fetchCv() {
  const query = `{
    cv { ${CV_FIELDS} }
  }
  `
  const url = `${BASE_URL}${graphqlUrl}?query=${query}`
  return ftch(url, { ...credentials() })
    .then(res => Promise.resolve(res.data.cv))
}

export function updateCv(id, cv) {
  const mutation = `mutation {
  setCv(fields: ${toGraphQLFields(cv)}) {
      ${CV_FIELDS}
    }
  }
  `
  const url = `${BASE_URL}${graphqlUrl}?query=${mutation}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
  }).then(res => Promise.resolve(res.data.cv))
}

// TODO
export function requestPasswordReset(email) {
  return ftch(`${BASE_URL}${PASSWORD_RESET}?email=${email}`)
}

export function fetchEvents() {
  return ftch(BASE_URL+eventsUrl, header())
}

export function updateEvent(id, event) {
  return ftch(`${BASE_URL}${eventsUrl}/${id}`, {
    ...header(),
    method: 'PATCH',
    body: event,
  })
}

export function fetchCompanies() {
  return ftch(BASE_URL+companiesUrl, header())
}

export function createEvent(event) {
  return ftch(`${BASE_URL}${eventsUrl}`, {
    headers: {
      // ...authHeader(), TODO
      ...jsonHeader(),
    },
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export function fetchMissingForms(eventId) {
  return ftch(`${BASE_URL}${eventsUrl}/${eventId}/missing_forms`, header())
}

export function notifyBefore(eventId) {
  return ftch(`${BASE_URL}${eventsUrl}/${eventId}/notify_before`, header())
}

export function notifyAfter(eventId) {
  return ftch(`${BASE_URL}${eventsUrl}/${eventId}/notify_after`, header())
}

export function importData(eventId) {
  return fetch(`${BASE_URL}${eventsUrl}/${eventId}/import_formdata`, header())
    .then(checkStatus)
}
