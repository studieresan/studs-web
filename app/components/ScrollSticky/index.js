import React, { useState, useEffect, useCallback } from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

const ScrollSticky = ({ position, children, onStick, onUnStick }) => {
  const [sticky, setSticky] = useState(false)

  const handleScroll = useCallback(
    () => {
      const scrolledPastTop = window.pageYOffset > position.top
      if (!sticky && scrolledPastTop) {
        onStick && onStick()
      } else if (sticky && !scrolledPastTop) {
        onUnStick && onUnStick()
      }
      setSticky(scrolledPastTop)
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
  onUnStick: PropTypes.func,
}

export default ScrollSticky
