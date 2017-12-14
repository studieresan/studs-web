import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styles from './styles.css'

function Section({ header, content }) {
  return (
    <div>
    <h2 className={styles.header}>
      <FormattedMessage {...header} />
    </h2>
    <p>
      <FormattedMessage {...content} />
    </p>
    </div>
  )
}

Section.propTypes = {
  header: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
  }).isRequired,
}

export default Section
