import 'whatwg-fetch'

/* eslint-disable import/no-unresolved */
// Load the manifest.json file and the .htaccess file
// import '!file?name=[name].[ext]!./favicon.ico'
// import '!file?name=[name].[ext]!./manifest.json'
// import 'file?name=[name].[ext]!./.htaccess'
/* eslint-enable import/no-unresolved */

// Import all the third party stuff
import React from 'react'
import App from 'containers/App'
import StudsRouter from './routes'
import configureStore from './store'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory  } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import LanguageProvider from 'containers/LanguageProvider'
import { selectLocationState } from 'containers/App/selectors'

// Import i18n messages
import { translationMessages } from './i18n'

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}
const browserHistory = createBrowserHistory()
const store = configureStore(initialState, browserHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
})

const render = (translatedMessages) => () => (
  <Provider store={store}>
    <LanguageProvider messages={translatedMessages}>
      <Router
        history={history}>
        <App>
          <StudsRouter/>
        </App>
      </Router>
    </LanguageProvider>
  </Provider>
)

// // Hot reloadable translation json files TODO
// if (module.hot) {
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept('./i18n', () => {
//     render(translationMessages)
//   })
// }

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

export default render(translationMessages)
