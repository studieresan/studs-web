import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import classnames from 'classnames'

function MemberImage({ picture, size, square, round, className }) {
  if (!picture) return null
  const sizes = {
    width: size,
    height: 'auto',
  }
  const classes = classnames(styles.picture, className, {
    [styles.round]: round,
  })

  const style = {
    maxHeight: square ? size + 'px' : 'auto',
  }
  return <img className={classes} src={picture} {...sizes} style={style} />
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
