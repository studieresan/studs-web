import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const ContactRequestHeader = ({ back }) => {
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

      <h1>Contact Requests</h1>
    </div>
  )
}

export default ContactRequestHeader

ContactRequestHeader.propTypes = {
  back: PropTypes.func.isRequired,
}
