export function setLoggedIn() {
  localStorage.loggedIn = 'true'
}

export function setLoggedOut() {
  localStorage.loggedIn = null
}

export function loggedIn() {
  return localStorage.loggedIn === 'true'
}

export function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

