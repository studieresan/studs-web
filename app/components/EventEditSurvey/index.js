import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { X } from 'react-feather'

const EventEditSurvey = ({ url, onRemove }) => (
  <div>
    <X onClick={onRemove}
      className={styles.cross}/>
    { url }
  </div>
)

EventEditSurvey.propTypes = {
  url: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default EventEditSurvey
