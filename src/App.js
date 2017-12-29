import 'whatwg-fetch'
import 'sanitize.css/sanitize.css'

/* eslint-disable import/no-unresolved */
// Load the manifest.json file and the .htaccess file
// import '!file?name=[name].[ext]!./favicon.ico'
// import '!file?name=[name].[ext]!./manifest.json'
// import 'file?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from 'containers/App'
import StudsRouter from './routes'
import configureStore from './store'

import { createBrowserHistory  } from 'history'
import { ConnectedRouter } from 'react-router-redux'
import LanguageProvider from 'containers/LanguageProvider'

import { translationMessages } from './i18n'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}
const browserHistory = createBrowserHistory()
const store = configureStore(initialState, browserHistory)

class AppComponent extends Component {
  render() {
    return <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <ConnectedRouter
          history={browserHistory}>
          <App>
            <StudsRouter/>
          </App>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  }
}

// Chunked polyfill for browsers without Intl support
// if (!window.Intl) { TODO
//   (new Promise((resolve) => {
//     resolve(System.import('intl'))
//   }))
//     .then(() => Promise.all([
//       System.import('intl/locale-data/jsonp/se.js'),
//       System.import('intl/locale-data/jsonp/en.js'),
//     ]))
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err
//     })
// } else {
//   render(translationMessages)
// }

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// import { install } from 'offline-plugin/runtime' TODO?
// install()

export default AppComponent
