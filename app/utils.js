import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'

export const initializeThirdParty = () => {
  if (isProduction()) {
    ReactGA.initialize('UA-125271813-1')
    Sentry.init({
      dsn: 'https://544ec1664d084abea6f10bf97334a80b@sentry.io/1298596',
    })
  }
}

export const trackPageView = url => {
  if (isProduction()) {
    ReactGA.pageView(url)
  }
}

const isProduction = () => process.env.NPM_CONFIG_PRODUCTION === 'production'
