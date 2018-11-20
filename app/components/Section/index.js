import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

function Section({ header, content }) {
  return (
    <div>
      <h1>
        <FormattedMessage {...header} />
      </h1>
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
