import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

const Spinner = ({ className }) => (
  <div className={styles.lds_dual_ring + ' ' + className} />
)
export default Spinner

Spinner.propTypes = {
  className: PropTypes.string,
}
