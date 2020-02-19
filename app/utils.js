import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'
import { useState, useEffect } from 'react'

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

export const paddTimeNumber = number => {
  return number.length < 2 ? '0' + number : number
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

      // if multiple values exist with the same name, save them in an array
      if (elem.type === 'checkbox' || data[elem.name]) {
        const existingValues = data[elem.name]
        if (Array.isArray(existingValues)) {
          value = [...data[elem.name], elem.value]
        } else {
          // If the old value is not an array, using the spread operator
          // will destroy the value: 14 -> '1', '4' for example
          value = [existingValues, elem.value]
        }
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

export const prettyUserRole = userRole => {
  switch (userRole) {
    case 'project_manager':
      return 'Project Manager'
    case 'it_group':
      return 'IT'
    default: {
      const pretty = userRole.split('_')[0]
      return pretty[0].toUpperCase() + pretty.slice(1)
    }
  }
}

// Debounche Hook from https://usehooks.com/useDebounce/
export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}
