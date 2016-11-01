/*
 *
 * LanguageProvider actions
 *
 */

import {
  CHANGE_LOCALE,
} from './constants';

export function changeLocale(languageLocale) {
  localStorage.setItem('language', languageLocale);

  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
