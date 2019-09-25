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

const COMPANY_FIELDS = `
  id,
  name,
  status {
    id
  },
  responsibleUser {
    id
  }`

export const fetchCompanies = () => {
  const query = `{
      companies {
        ${COMPANY_FIELDS}
      }
    }`
  return executeGraphQL(query)
    .then(res => res.data.companies)
    .catch(err => console.error(err))
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
  return executeGraphQL(query)
    .then(res => res.data.company)
    .catch(err => console.error(err))
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
  return executeGraphQL(query)
    .then(res => res.data.studsUsers)
    .catch(err => console.error(err))
}

export const fetchSaleStatuses = () => {
  const query = `{
    allCompanySalesStatuses {
        id,
        name
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.allCompanySalesStatuses)
    .catch(err => console.error(err))
}

export const createCompany = name => {
  const query = `mutation {
    createCompany(name: "${name}") {
      ${COMPANY_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.createCompany)
    .catch(err => console.error(err))
}

export const updateCompany = (companyId, companyFields) => {
  const query = `mutation {
    updateCompany(id: "${companyId}", fields: {
        ${Object.keys(companyFields).map(
          k =>
            k +
            ': ' +
            (companyFields[k] ? '"' + companyFields[k] + '"\n' : null + '\n')
        )}
    }) {
        ${COMPANY_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.updateCompany)
    .catch(err => console.error(err))
}

const CONTACT_FIELDS = `
  id,
  name,
  email,
  phoneNumber,
  comment,`

export const fetchContacts = companyId => {
  const query = `{
    contacts(companyId: "${companyId}") {
        ${CONTACT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.contacts)
    .catch(err => console.error(err))
}

export const createContact = (companyId, contactFields) => {
  const query = `mutation {
    createContact(companyId: "${companyId}", fields: {
        ${Object.keys(contactFields).map(
          k => k + ': "' + contactFields[k] + '"\n'
        )}
    }) {
        ${CONTACT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.createContact)
    .catch(err => console.error(err))
}

export const removeContact = contactId => {
  const query = `mutation {
    removeContact(id: "${contactId}")
  }`
  return executeGraphQL(query)
    .then(res => res.data.removeContact)
    .catch(err => console.error(err))
}

export const updateContact = (contactId, contactFields) => {
  const query = `mutation {
    updateContact(id: "${contactId}", fields: {
        ${Object.keys(contactFields).map(
          k => k + ': "' + contactFields[k] + '"\n'
        )}
    }) {
        ${CONTACT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.updateContact)
    .catch(err => console.error(err))
}

export const createComment = (companyId, text) => {
  const query = `mutation {
    createComment(companyId: "${companyId}", text: "${text}") {
        id
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.createComment.id)
    .catch(err => console.error(err))
}

export const fetchComments = companyId => {
  const query = `{
    comments(companyId: "${companyId}") {
        id,
        text,
        user {
          id,
          profile {
              picture
          }
        },
        createdAt,
        edited,
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.comments)
    .then(comments =>
      comments.map(c => ({
        ...c,
        user: { id: c.user.id, picture: c.user.profile.picture },
      }))
    )
    .then(comments => {
      comments.sort((a, b) =>
        new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
      )
      return comments
    })
    .catch(err => console.error(err))
}

export const removeComment = commentId => {
  const query = `mutation {
    removeComment(id: "${commentId}")
  }`
  return executeGraphQL(query)
    .then(res => res.data.removeComment)
    .catch(err => console.error(err))
}

export const updateComment = (commentId, text) => {
  const query = `mutation {
    updateComment(id: "${commentId}", text: "${text}") {
      id
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.updateComment)
    .catch(err => console.error(err))
}
