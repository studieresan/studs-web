import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const CompanyHeader = ({ back }) => {
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

      <div className={styles.header_text}>Kontaktförfrågningar</div>
    </div>
  )
}

export default CompanyHeader

CompanyHeader.propTypes = {
  back: PropTypes.func.isRequired,
}
