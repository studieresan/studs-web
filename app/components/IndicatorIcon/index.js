import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const IndicatorIcon = ({ ok }) => {
  return (
    <span className={styles.indicatorIcon + (ok ? ' ' + styles.ok : '')}>
      &#9679;
    </span>
  )
}

IndicatorIcon.propTypes = {
  ok: PropTypes.bool.isRequired,
}

export default IndicatorIcon
