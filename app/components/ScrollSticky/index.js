import React, { useState, useEffect } from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

const ScrollSticky = ({ position, children }) => {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () =>
      setSticky(window.pageYOffset > position.top)
    )
  }, [])

  return (
    <div
      className={styles.sticky_container + ' ' + (sticky && styles.sticky)}
      style={position}
    >
      {children}
    </div>
  )
}

ScrollSticky.propTypes = {
  position: PropTypes.object.isRequired,
  children: PropTypes.any,
}

export default ScrollSticky
