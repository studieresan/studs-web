import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.css'

function Button({ className, type, disabled, onClick, children }) {
  const classes = classNames({
    [styles[`${type}`]]: type && !disabled,
    [styles.disabled]: disabled,
  }, styles.button, className)
  return (
    <div className={styles.wrapper}>
      <button className={classes} onClick={onClick}>
        { children }
      </button>
    </div>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'bright',
    'danger',
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button
