import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classnames from 'classnames'

function MemberImage({ picture, size, square, round, className }) {
  if (!picture) return null
  const sizes = {
    width: size,
    height: square ? size : 'auto',
  }
  const classes = classnames(styles.picture, className, {
    [styles.round]: round,
  })
  return <img className={classes} src={picture} {...sizes} />
}

MemberImage.propTypes = {
  picture: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  square: PropTypes.bool,
  round: PropTypes.bool,
  className: PropTypes.string,
}

MemberImage.defaultProps = {
  size: 300,
  square: false,
  round: false,
  className: '',
}

export default MemberImage
