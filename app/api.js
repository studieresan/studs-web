import { pickBy, omit } from 'lodash'

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5040'
const GRAPHQL = '/graphql'
const SIGNUP = '/signup'
const LOGIN = '/login'
const PASSWORD_UPDATE = '/account/password'
const PASSWORD_FORGOT = '/forgot'
const PASSWORD_RESET = '/reset'
const STATUS_OK = 200

function checkStatus(response) {
  if (response.status >= STATUS_OK && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
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

function authorizationHeader() {
  const jwtToken = localStorage.token
  return {
    Authorization: `Bearer ${jwtToken}`,
  }
}

function graphQLHeader() {
  return {
    'Content-Type': 'application/graphql',
  }
}

function ftch(...args) {
  return fetch(...args)
    .then(checkStatus)
    .then(parseJSON)
}

function executeGraphQL(query) {
  const url = `${BASE_URL}${GRAPHQL}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
    headers: {
      ...authorizationHeader(),
      ...graphQLHeader(),
    },
    body: query,
  })
}

function executeGraphQLMutation(query) {
  const url = `${BASE_URL}${GRAPHQL}`
  return ftch(url, {
    method: 'POST',
    ...credentials(),
    headers: {
      ...authorizationHeader(),
      ...jsonHeader(),
    },
    body: query,
  })
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
  linkedIn
  github
  picture
  companyName
`

export function fetchUser() {
  const query = `{
    user {
      id
      profile {
        ${USER_PROFILE_FIELDS}
      }
      permissions
    }
  }
  `
  return executeGraphQL(query).then(res =>
    Promise.resolve({
      id: res.data.user.id,
      ...res.data.user.profile,
      permissions: res.data.user.permissions,
    })
  )
}

function toGraphQLFields(str) {
  // This will remove any key which has a 'null' value
  const withoutNulls = pickBy(str, a => a !== null && a !== undefined)
  return JSON.stringify(withoutNulls).replace(/"([^"]*)":/g, '$1:')
}

export function updateUser(newFields) {
  const mutation = `mutation {
    updateProfile(fields: ${toGraphQLFields(newFields)}) {
      ${USER_PROFILE_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation).then(res => res.data.updateProfile)
}

export function createUser(userInfo) {
  const body = JSON.stringify({
    ...userInfo,
    token: process.env.SIGNUP_TOKEN || 'asdf',
  })

  return ftch(BASE_URL + SIGNUP, {
    method: 'POST',
    headers: {
      ...jsonHeader(),
    },
    body,
  })
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
  return ftch(BASE_URL + LOGIN, post)
}

export function updateUserPassword({ password, confirmPassword }) {
  const post = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      ...authorizationHeader(),
      ...jsonHeader(),
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  }
  return ftch(BASE_URL + PASSWORD_UPDATE, post)
}

export function fetchUsers() {
  const query = `{
    studsUsers: users(memberType: studs_member) {
      profile { ${USER_PROFILE_FIELDS} }
      cv { ${CV_FIELDS} }
    }
    companyUsers: users(memberType: company_member) {
      profile { ${USER_PROFILE_FIELDS} }
    }
  }
  `
  return executeGraphQL(query).then(res => Promise.resolve(res.data))
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
  return executeGraphQL(query).then(res => res.data.user.cv)
}

export function updateCv(id, cv) {
  const mutation = `mutation {
    updateCV(fields: ${toGraphQLFields(cv)}) {
      ${CV_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation).then(res => res.data.updateCV)
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

const EVENT_FIELDS = `
  id
  companyName
  schedule
  privateDescription
  publicDescription
  date
  beforeSurveys
  afterSurveys
  location
  pictures
  published
  responsible
`

export function fetchEvents() {
  const query = `query {
    allEvents {
      ${EVENT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.allEvents)
    .then(events => events.map(e => ({ ...e, date: new Date(e.date) })))
}

export function fetchOldEvents() {
  const query = `query {
    oldEvents {
      ${EVENT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.oldEvents)
    .then(events => events.map(e => ({ ...e, date: new Date(e.date) })))
}

export function saveEvent(e) {
  const event = omit(e, 'id')
  const id = e.id
  if (id) {
    const mutation = `mutation {
      updateEvent(eventId: "${id}", fields: ${toGraphQLFields(event)}) {
        ${EVENT_FIELDS}
      }
    }
    `
    return executeGraphQL(mutation)
      .then(res => res.data.updateEvent)
      .then(event => ({ ...event, date: new Date(event.date) }))
  } else {
    const mutation = `mutation {
      createEvent(fields: ${toGraphQLFields(event)}) {
        ${EVENT_FIELDS}
      }
    }
    `
    return executeGraphQL(mutation)
      .then(res => res.data.createEvent)
      .then(event => ({ ...event, date: new Date(event.date) }))
  }
}

export function removeEventWithId(id) {
  if (id) {
    const mutation = `mutation {
      removeEvent(eventId: "${id}")
    }
    `
    return executeGraphQL(mutation).then(res => res.data.updateEvent)
  }
}

// TODO
// export function notifyBefore(eventId) {
//   return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_before`, header())
// }

// export function notifyAfter(eventId) {
//   return ftch(`${BASE_URL}${EVENTS}/${eventId}/notify_after`, header())
// }

export const uploadImage = file => {
  const signedUrlEndpoint = `${BASE_URL}/signed-upload?file-name=${
    file.name
  }&file-type=${file.type}`

  const options = {
    method: 'GET',
    ...credentials(),
    headers: {
      ...authorizationHeader(),
    },
  }

  // Uploading a file consists of two steps. First fetching a signed s3
  // url from the backend, then uploading the file using that url.
  // The url for the image is returned if everything worked
  return ftch(signedUrlEndpoint, options).then(({ signedRequest, url }) =>
    uploadFile(file, signedRequest, url)
  )
}

const uploadFile = (file, signedRequest, url) => {
  const uploadData = {
    method: 'PUT',
    body: file,
  }

  return fetch(signedRequest, uploadData)
    .then(checkStatus)
    .then(() => Promise.resolve(url))
}

const PRE_EVENT_FIELDS = `
  interestInRegularWorkBefore,
  interestInCompanyMotivationBefore,
  familiarWithCompany,
  viewOfCompany,
`

const POST_EVENT_FIELDS = `
  interestInRegularWork,
  interestInCompanyMotivation,
  eventImpact,
  qualifiedToWork,
  atmosphereRating,
  activitiesRating,
  foodRating,
  eventFeedback,
  eventImprovements,
`

export const fetchEventForms = (userId, eventId) => {
  const query = `{
    eventForms(userId: "${userId}", eventId:"${eventId}") {
      ... on PreEventForm {
        ${PRE_EVENT_FIELDS}
      },
      ... on PostEventForm {
        ${POST_EVENT_FIELDS}
      }
    }
  }`

  return executeGraphQL(query).then(res => res.data.eventForms)
}

export const fetchAllEventFormsByEventId = eventId => {
  const query = `{
    allEventForms(eventId:"${eventId}") {
      ... on PreEventForm {
        ${PRE_EVENT_FIELDS}
      },
      ... on PostEventForm {
        ${POST_EVENT_FIELDS}
      }
    }
  }`
  return executeGraphQL(query).then(res => res.data.allEventForms)
}

const CreatePreEventFormOperationName = 'CreatePreEventForm'
const CreatePostEventFormOperationName = 'CreatePostEventForm'

const CreatePreEventFormQuery = `
  mutation ${CreatePreEventFormOperationName}
  ($eventId: String!, $fields: PreEventFormInputType!) {
    createPreEventForm(eventId: $eventId, fields: $fields) {
      ${PRE_EVENT_FIELDS}
    }
  }
`

const CreatePostEventFormQuery = `
  mutation ${CreatePostEventFormOperationName}
  ($eventId: String!, $fields: PostEventFormInputType!) {
    createPostEventForm(eventId: $eventId, fields: $fields) {
      ${POST_EVENT_FIELDS}
    }
  }
`

export const saveEventForm = formdata => {
  const eventId = formdata.eventId
  const preEvent = formdata.preEvent === true
  formdata = omit(formdata, ['eventId', 'preEvent'])

  const mutation = JSON.stringify({
    query: preEvent ? CreatePreEventFormQuery : CreatePostEventFormQuery,
    variables: {
      eventId: eventId,
      fields: formdata,
    },
    operationName: preEvent ? 'CreatePreEventForm' : 'CreatePostEventForm',
  })

  return executeGraphQLMutation(mutation)
}

/**
 * Fetch list of people who haven't filled in pre event forms
 * and post event forms for an event
 *
 * @export
 * @param {string} eventId
 */
export function fetchPeopleMissingFeedback(eventId) {
  const query = `
    query {
      missingPostEventFormUsers(eventId: "${eventId}") {
        profile {
          firstName
          lastName
        }
      }
      missingPreEventFormUsers(eventId: "${eventId}") {
        profile {
          firstName
          lastName
        }
      }
    }
  `
  return executeGraphQL(query).then(res => res.data)
}

export const fetchCompanies = () => {
  const query = `{
      companies {
        id,
        name,
        status {
          id
        },
        responsibleUser {
          id
        }
      }
    }`
  try {
    return executeGraphQL(query).then(res => res.data.companies)
  } catch (e) {
    console.error(e)
  }
}

export const fetchCompany = companyId => {
  const query = `{
    company (companyId: "${companyId}") {
        id,
        name,
        status {
            id,
            name,
        },
        responsibleUser {
            id,
            profile {
                firstName,
                lastName
            }
        }
    }
  }`
  try {
    return executeGraphQL(query).then(res => res.data.company)
  } catch (e) {
    console.error(e)
  }
}

export const fetchStudsUserNames = () => {
  const query = `{
      studsUsers: users(memberType: studs_member) {
        id,
        profile { 
          firstName,
          lastName,
          picture,
        }
      }
    }`
  try {
    return executeGraphQL(query).then(res => res.data.studsUsers)
  } catch (e) {
    console.error(e)
  }
}

export const fetchSaleStatuses = () => {
  const query = `{
    allCompanySalesStatuses {
        id,
        name
    }
  }`
  try {
    return executeGraphQL(query).then(res => res.data.allCompanySalesStatuses)
  } catch (e) {
    console.error(e)
  }
}

export const createCompany = name => {
  const query = `mutation {
    createCompany(name: "${name}") {
        id,
    }
  }`
  try {
    return executeGraphQL(query).then(res => res.data.createCompany.id)
  } catch (e) {
    console.error(e)
  }
}
