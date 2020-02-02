import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const BackHeader = ({ title, back }) => {
  return (
    <div className={styles.header}>
      <div
        className={styles.back_button}
        onClick={() => {
          back()
        }}
      >
        <i className='fa fa-arrow-left' />
      </div>

      <h1>{title}</h1>
    </div>
  )
}

export default BackHeader

BackHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
}
