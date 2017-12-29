/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl'

import en from 'react-intl/locale-data/en'
import se from 'react-intl/locale-data/se'
import enTranslationMessages from './translations/en.json'
import seTranslationMessages from './translations/se.json'

export const appLocales = [
  'se',
  'en',
]

export const appLocaleNames = [
  { key: 'se', value: 'Swedish' },
  { key: 'en', value: 'English' },
]

addLocaleData([...en, ...se])

const formatTranslationMessages = (messages) => {
  const formattedMessages = {}
  for (const message of messages) {
    formattedMessages[message.id] = message.message || message.defaultMessage
  }

  return formattedMessages
}

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  se: formatTranslationMessages(seTranslationMessages),
}
