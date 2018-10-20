import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import ReactGA from 'react-ga'
import { unregister } from './registerServiceWorker'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://544ec1664d084abea6f10bf97334a80b@sentry.io/1298596',
})

if (process.env.NPM_CONFIG_PRODUCTION === 'production') {
  ReactGA.initialize('UA-125271813-1')
}

const render = (Component) => {
  ReactDOM.render((
    <AppContainer>
      <Component />
    </AppContainer>
  ), document.getElementById('root'))
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

unregister()
