export function setLoggedIn() {
  localStorage.loggedIn = 'true'
}

export function setLoggedOut() {
  localStorage.loggedIn = null
}

export function loggedIn() {
  return localStorage.loggedIn === 'true'
}

