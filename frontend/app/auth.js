const baseUrl = 'https://api.studieresan.se/';
const STATUS_OK = 200;

export function login(email, pass, cb) {
  const token = btoa(`${email}:${pass}`);
  fetch(baseUrl, {
    headers: {
      'Authorization': 'Basic ' + token
    }
  }).then(res => {
    if(res.status === STATUS_OK) {
      localStorage.token = token;
      cb(true);
    } else {
      cb(false);
    }
  });
  
}

export function requireAuth(nextState, replace) {
  if(!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export function loggedIn() {
  return !!localStorage.token;
}
