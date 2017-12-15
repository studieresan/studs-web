import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.css'

function Button({ className, type, color, disabled, onClick, children }) {
  const classes = classNames({
    [styles[`${color}`]]: color && !disabled,
    [styles.disabled]: disabled,
  }, styles.button, className)
  return (
    <div className={styles.wrapper}>
      <button type={type} className={classes} onClick={onClick}>
        { children }
      </button>
    </div>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'button',
    'submit',
    'reset',
  ]),
  color: PropTypes.oneOf([
    'bright',
    'danger',
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button
