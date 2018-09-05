import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import ReactGA from 'react-ga'
import { unregister } from './registerServiceWorker'

ReactGA.initialize('UA-125271813-1')

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
