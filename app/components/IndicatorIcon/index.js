import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const IndicatorIcon = ({ ok }) => {
  return ok ? (
    <span className={styles.indicatorIconOk}>&#9679;</span>
  ) : (
    <span className={styles.indicatorIcon}>&#9679;</span>
  )
}

IndicatorIcon.propTypes = {
  ok: PropTypes.bool.isRequired,
}

export default IndicatorIcon
