import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import styles from './styles.css'

const cx = classNames.bind(styles)

const IndicatorIcon = ({ ok }) => {
  const className = cx({
    indicatorIcon: true,
    ok: ok,
  })
  return <span className={className}>&#9679;</span>
}

IndicatorIcon.propTypes = {
  ok: PropTypes.bool.isRequired,
}

export default IndicatorIcon
