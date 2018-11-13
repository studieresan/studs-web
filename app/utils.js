import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'

export const initializeThirdParty = () => {
  if (isProduction) {
    ReactGA.initialize(process.env.GA_TOKEN)
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    })
  }
}

export const trackPageView = url => {
  if (isProduction) {
    ReactGA.pageview(url)
  }
}

export const trackEvent = (category, action) => {
  if (isProduction) {
    ReactGA.event({
      category,
      action,
    })
  }
}

const isProduction = process.env.NPM_CONFIG_PRODUCTION === 'true'
