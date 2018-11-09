export function setLoggedIn(token) {
  localStorage.loggedIn = 'true'
  localStorage.token = token
}

export function setLoggedOut() {
  localStorage.loggedIn = null
  localStorage.token = null
}

export function loggedIn() {
  return localStorage.loggedIn === 'true'
}
