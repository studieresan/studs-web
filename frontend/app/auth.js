export function generateToken(email, pass) {
  return btoa(`${email}:${pass}`);
}
export function setToken(token) {
  localStorage.token = token;
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.token;
}

export function loggedIn() {
  return !!localStorage.token;
}

export function requireAuth(nextState, replace) {
  if(!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

