import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.css'

function Button({
  className,
  type,
  color,
  full,
  wrapper,
  disabled,
  onClick,
  children,
}) {
  const classes = classNames({
    [styles[`${color}`]]: color,
    [styles.disabled]: disabled,
    [styles.full]: full,
  }, styles.button, className)
  return (
    <Wrapper display={wrapper}>
      <button type={type} className={classes} onClick={onClick}>
        { children }
      </button>
    </Wrapper>
  )
}

const Wrapper = ({ display, children }) => {
  if (!display) return children
  return (
    <div className={styles.wrapper}>
      { children }
    </div>
  )
}

Wrapper.propTypes = {
  display: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'button',
    'submit',
    'reset',
  ]),
  color: PropTypes.oneOf([
    'icon',
    'default',
    'bright',
    'danger',
  ]),
  full: PropTypes.bool,
  wrapper: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

Button.defaultProps = {
  color: 'default',
  type: 'button',
  full: false,
  wrapper: false,
}

export default Button
