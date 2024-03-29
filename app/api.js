import { pickBy } from 'lodash'
import moment from 'moment'

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
    .catch(console.error)
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

const USER_PROFILE_FIELDS = `
  email
  phone
  linkedIn
  github
  master
  allergies  
`

export function fetchUser() {
  const query = `{
    user {
      id
      firstName
      lastName
      studsYear
      info {
        ${USER_PROFILE_FIELDS}
        role
        picture
        permissions
      }
    }
  }
  `
  return executeGraphQL(query).then(res => {
    return Promise.resolve({
      id: res.data.user.id,
      firstName: res.data.user.firstName,
      lastName: res.data.user.lastName,
      studsYear: res.data.user.studsYear,
      info: res.data.user.info,
      permissions: res.data.user.info.permissions,
    })
  })
}

function toGraphQLFields(str) {
  // This will remove any key which has a 'null' value
  const withoutNulls = pickBy(str, a => a !== null && a !== undefined)
  return JSON.stringify(withoutNulls).replace(/"([^"]*)":/g, '$1:')
}

const wrapInQuotes = stringValue => {
  return '"' + stringValue.replace(/"/g, '\\"') + '"'
}

export function updateUser(newFields) {
  const mutation = `mutation {
    userUpdate(id: null, info: ${toGraphQLFields(newFields)}) {
      ${USER_PROFILE_FIELDS}
    }
  } `
  return executeGraphQL(mutation).then(res => {
    return res.data.userUpdate
  })
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

export function fetchUsers(studsYear) {
  const query = `{
    users(userRole: null, studsYear: ${studsYear}) {
      id
      firstName
      lastName
      studsYear
      info { 
        role
        ${USER_PROFILE_FIELDS}
        cv { ${CV_FIELDS} }
        picture
      }
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.users)
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

export function updateCv(id, cv) {
  const mutation = `
  mutation {
    userUpdate(info:{
      cv: ${toGraphQLFields(cv)} 
    }) {
      cv {
        ${CV_FIELDS}
      }
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
  date
  studsYear
  location
  publicDescription
  privateDescription
  beforeSurvey
  afterSurvey
  pictures
  published
  responsible { id }
  company { id, name }
`

export function fetchEvents() {
  const query = `query {
    events {
      ${EVENT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.events)
    .then(events =>
      events.map(e => ({
        ...e,
        date: new Date(e.date),
      }))
    )
}

export function saveEvent({ id, ...event }) {
  event.companyId = event.company.id
  delete event.company
  event.responsibleUserId = event.responsible ? event.responsible.id : null
  delete event.responsible

  if (id) {
    delete event.companyId
    const mutation = `mutation {
      eventUpdate(id: "${id}", fields: ${toGraphQLFields(event)}) {
        ${EVENT_FIELDS}
      }
    }
    `
    return executeGraphQL(mutation)
      .then(res => res.data.eventUpdate)
      .then(event => ({ ...event, date: new Date(event.date) }))
  } else {
    const mutation = `mutation {
      eventCreate(fields: ${toGraphQLFields(event)}) {
        ${EVENT_FIELDS}
      }
    }
    `
    return executeGraphQL(mutation)
      .then(res => res.data.eventCreate)
      .then(event => ({ ...event, date: new Date(event.date) }))
  }
}

export function removeEventWithId(id) {
  if (id) {
    const mutation = `mutation {
      eventDelete(id: "${id}")
    }
    `
    return executeGraphQL(mutation).then(res => res.data.eventDelete)
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

const COMPANY_FIELDS = `
id
name
companyContacts {
  name
  email
  phone
  comment
}
statuses {
  studsYear
  responsibleUser {
    id
    firstName
    lastName
    studsYear
  }
  statusDescription
  statusPriority
  amount
  salesComments {
    text
    createdAt
    user {
      id
      firstName
      lastName
      studsYear
    }
  }
}
`

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

export const fetchSoldCompanies = () => {
  const query = `{
    companies {
      id
      statuses {
        statusDescription
      }
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.companies)
    .then(companies => companies.filter(company => company.amount > 0))
    .catch(err => console.error(err))
}

export const fetchCompany = companyId => {
  const query = `{
    company (companyId: "${companyId}") {
       ${COMPANY_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.company)
    .catch(err => console.error(err))
}

export const createCompany = name => {
  const query = `mutation {
    companyCreate(name: ${wrapInQuotes(name)}) {
      ${COMPANY_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.createCompany)
    .catch(err => console.error(err))
}

export const updateCompany = (companyId, studsYear, companyFields) => {
  const query = `mutation {
    updateCompany(id: "${companyId}", year: ${studsYear}, fields: {
        ${Object.keys(companyFields).map(
          k =>
            k +
            ': ' +
            (companyFields[k]
              ? k === 'amount'
                ? companyFields[k]
                : wrapInQuotes(companyFields[k])
              : null) +
            '\n'
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
  phone,
  comment,`

export const fetchContacts = companyId => {
  const query = `{
    company(companyId: "${companyId}") {
      companyContacts{
        ${CONTACT_FIELDS}
      }
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.company.companyContacts)
    .then(contacts =>
      contacts.map(contact => ({
        ...contact,
        phoneNumber: contact.phone,
      }))
    )
    .catch(err => console.error(err))
}

export const createContact = (companyId, contactFields) => {
  const query = `mutation {
    createContact(companyId: "${companyId}", fields: {
        ${Object.keys(contactFields).map(
          k => k + ': ' + wrapInQuotes(contactFields[k]) + '\n'
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
          k => k + ': ' + wrapInQuotes(contactFields[k]) + '\n'
        )}
    }) {
        ${CONTACT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.updateContact)
    .catch(err => console.error(err))
}

const COMMENT_FIELDS = `
  id,
  text,
  user {
    id,
    studsYear
    firstName
    lastName
    info {
        picture,
    }
  },
  createdAt`

export const fetchComments = (companyId, year) => {
  const query = `{
    company(companyId: "${companyId}") {
      statuses {
        studsYear
        salesComments {
          ${COMMENT_FIELDS}
        }
      }
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.company.statuses)
    .then(statuses => statuses.find(({ studsYear }) => studsYear === year))
    .then(status => status.salesComments)
    .then(comments =>
      comments.map(company => ({
        ...company,
        user: {
          id: company.user.id,
          firstName: company.user.firstName,
          lastName: company.user.lastName,
          picture: company.user.info.picture,
        },
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

export const createComment = (companyId, text) => {
  const query = `mutation {
    createComment(companyId: "${companyId}", text: ${wrapInQuotes(text)}) {
        ${COMMENT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.createComment)
    .then(c => ({
      ...c,
      user: { id: c.user.id, picture: c.user.profile.picture },
    }))
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
    updateComment(id: "${commentId}", text: ${wrapInQuotes(text)}) {
      ${COMMENT_FIELDS}
    }
  }`
  return executeGraphQL(query)
    .then(res => res.data.updateComment)
    .then(c => {
      return {
        ...c,
        user: { id: c.user.id, picture: c.user.profile.picture },
      }
    })
    .catch(err => console.error(err))
}

export const fetchContactRequests = () => {
  const query = `{
    contactRequests {
      id,
      email,
      arrived: createdAt 
    }
  }`
  return executeGraphQL(query).then(res => res.data.contactRequests)
}

export const fetchUserRoles = () => {
  const query = `query {
    userRoles
  }`
  return executeGraphQL(query).then(res => res.data.userRoles)
}

export const getPDFURL = file => {
  return `${BASE_URL}${file}`
}

const BLOG_FIELDS = `
id
title
description
pictures
frontPicture
author {
  id
  firstName
  lastName
  info {
    picture
  }
}
date
`

export const createBlogPost = post => {
  post['date'] = moment(new Date()).format('YYYY-MM-DD')
  const mutation = `mutation {
    blogCreate(fields: ${toGraphQLFields(post)}) {
      ${BLOG_FIELDS}
    }
  }
  `
  return executeGraphQL(mutation).then(res => res.data)
}

export function getBlogPosts() {
  const query = `query {
    blogPosts {
      ${BLOG_FIELDS}
    }
  }`
  return executeGraphQL(query).then(res => {
    return res.data.blogPosts
  })
}

export const updateBlogPost = (id, post) => {
  const query = `mutation {
    blogPostUpdate(id: "${id}", fields: ${toGraphQLFields(post)}) {
      ${BLOG_FIELDS}
    }
  }
  `
  return executeGraphQL(query).then(res => res.data.blogPostUpdate)
}

export const deleteBlogpost = id => {
  const query = `mutation {
    blogPostDelete(id: "${id}")
  }`

  return executeGraphQL(query)
}
