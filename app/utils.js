import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'

export const initializeThirdParty = () => {
  if (isProduction()) {
    ReactGA.initialize(process.env.GA_TOKEN)
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    })
  }
}

export const trackPageView = url => {
  if (isProduction()) {
    ReactGA.pageView(url)
  }
}

const isProduction = () => process.env.NPM_CONFIG_PRODUCTION === 'production'
