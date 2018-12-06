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

const isValidElement = elem => elem.name && elem.value

// Only take into account text-like inputs and checked radios/checkboxes
const isValidValue = elem =>
  !['checkbox', 'radio'].includes(elem.type) || elem.checked

/**
 * Utility function for converting form data to an object.
 *
 * @param {HTMLFormControlsCollection} formElements
 */
export function formToObject(formElements) {
  const formData = Array.from(formElements).reduce((data, elem) => {
    if (isValidElement(elem) && isValidValue(elem)) {
      let value
      if (elem.type === 'checkbox' || data[elem.name]) {
        // if multiple values exist with the same name, save them in an array
        value = [...data[elem.name], elem.value]
      } else {
        value = elem.value
      }

      return {
        ...data,
        [elem.name]: value,
      }
    }

    return data
  }, {})

  return formData
}
