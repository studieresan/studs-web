import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { unregister } from './registerServiceWorker'
import { initializeThirdParty } from './utils'
import './index.css'

import './static/fonts/magnat/MagnatHead-SemiBoldItalic.otf'

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
