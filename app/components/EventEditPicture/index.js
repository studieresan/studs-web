import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { X } from 'react-feather'

const EventEditPicture = ({ url, onRemove }) => (
  <div className={styles.container}>
    <img src={url} className={styles.image} />
    <button className={styles.crossContainer} onClick={onRemove}>
      <X className={styles.cross} />
    </button>
  </div>
)

EventEditPicture.propTypes = {
  url: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default EventEditPicture
