const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5040'
const GRAPHQL = '/graphql'
const LOGIN = '/login'
const LOGOUT = '/logout'
const PASSWORD_UPDATE = '/account/password'
const PASSWORD_FORGOT = '/forgot'
const PASSWORD_RESET = '/reset'
// const cvUrl = '/resume'
const EVENTS = '/events'
const COMPANIES = '/companies'
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

const USER_PROFILE_FIELDS = `
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
  const query = `{
    user {
      profile {
        ${USER_PROFILE_FIELDS}
      }
    }
  }
  `
  const url = `${BASE_URL}${GRAPHQL}?query=${query}`
  return ftch(url, { ...credentials() })
    .then(res => Promise.resolve(res.data.user.profile))
}

function toGraphQLFields(str) {
  return JSON.stringify(str).replace(/"([^"]*)":/g, '$1:')
}

export function updateUser(newFields) {
  const mutation = `mutation {
    updateProfile(fields: ${toGraphQLFields(newFields)}) {
      ${USER_PROFILE_FIELDS}
    }
  }
  `
  const url = `${BASE_URL}${GRAPHQL}?query=${encodeURIComponent(mutation)}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
  }).then(res => Promise.resolve(res.data.updateProfile))
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
  return ftch(BASE_URL+LOGIN, post)
}

export function logoutUser() {
  return ftch(`${BASE_URL}${LOGOUT}`, { ...credentials() })
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
  return ftch(BASE_URL+PASSWORD_UPDATE, post)
}

export function fetchUsers() {
  const query = `{
    users(memberType: studs_member) {
      profile { ${USER_PROFILE_FIELDS} }
      cv { ${CV_FIELDS} }
    }
  }
  `
  const url = `${BASE_URL}${GRAPHQL}?query=${query}`
  return ftch(url, { ...credentials() })
    .then(res => Promise.resolve(res.data.users))
}

const CV_FIELDS = `
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
    user {
      cv { ${CV_FIELDS} }
    }
  }
  `
  const url = `${BASE_URL}${GRAPHQL}?query=${query}`
  return ftch(url, { ...credentials() })
    .then(res => Promise.resolve(res.data.user.cv))
}

export function updateCv(id, cv) {
  const mutation = `mutation {
  updateCV(fields: ${toGraphQLFields(cv)}) {
      ${CV_FIELDS}
    }
  }
  `
  const url = `${BASE_URL}${GRAPHQL}?query=${encodeURIComponent(mutation)}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
  }).then(res => Promise.resolve(res.data.updateCV))
}

export function requestPasswordReset(email) {
  const url = `${BASE_URL}${PASSWORD_FORGOT}`
  return ftch(url, {
    method: 'POST',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify({
      email,
    }),
  })
}

export function resetPassword(password, confirmPassword, token) {
  const url = `${BASE_URL}${PASSWORD_RESET}/${token}`
  return ftch(url, {
    method: 'POST',
    headers: {
      ...jsonHeader(),
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  })
}

export function fetchEvents() {
  return ftch(BASE_URL+EVENTS, header())
}

export function updateEvent(id, event) {
  return ftch(`${BASE_URL}${EVENTS}/${id}`, {
    ...header(),
    method: 'PATCH',
    body: event,
  })
}

export function fetchCompanies() {
  return ftch(BASE_URL+COMPANIES, header())
}

export function createEvent(event) {
  return ftch(`${BASE_URL}${EVENTS}`, {
    headers: {
      // ...authHeader(), TODO
      ...jsonHeader(),
    },
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export function fetchMissingForms(eventId) {
  return ftch(`${BASE_URL}${EVENTS}/${eventId}/missing_forms`, header())
}

export function notifyBefore(eventId) {
  return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_before`, header())
}

export function notifyAfter(eventId) {
  return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_after`, header())
}

export function importData(eventId) {
  return fetch(`${BASE_URL}${EVENTS}/${eventId}/import_formdata`, header())
    .then(checkStatus)
}
