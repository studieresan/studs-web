import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

const ScrollSticky = ({ position, children, onStick }) => {
  const [sticky, setSticky] = useState(false)

  const handleScroll = useCallback(
    () => {
      if (!sticky && window.pageYOffset > position.top) {
        onStick && onStick()
      }
      setSticky(window.pageYOffset > position.top)
    },
    [sticky]
  )

  useEffect(
    () => {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    },
    [handleScroll]
  )

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
  onStick: PropTypes.func,
}

export default ScrollSticky
