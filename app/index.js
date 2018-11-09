import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { unregister } from './registerServiceWorker'
import { initializeThirdParty } from './utils'

initializeThirdParty()

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

unregister()
