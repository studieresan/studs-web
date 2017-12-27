/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLocale } from '../LanguageProvider/selectors'
import { changeLocale } from '../LanguageProvider/actions'
import { appLocaleNames } from '../../i18n'
import { createSelector } from 'reselect'
import styles from './styles.css'

function LocaleToggle(props) {
  return (
    <div className={styles.localeToggle}>
      {
        appLocaleNames
          .filter(({ key }) => key !== props.locale)
          .map(({ key, value }) => (
          <span
            key={key}
            className={styles.localeToggleLink}
            onClick={props.onLocaleSwitch}
            data-language={key}>
              {value}
          </span>
        ))
      }
    </div>
  )
}

LocaleToggle.propTypes = {
  onLocaleSwitch: PropTypes.func,
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
}

const mapStateToProps = createSelector(
  selectLocale(),
  (locale) => ({ locale })
)

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleSwitch: (evt) =>
      dispatch(changeLocale(evt.target.dataset.language)),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle)
