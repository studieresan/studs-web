import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

export const YearPicker = ({ selectedYear, setStudsYear }) => {
  return (
    <select
      className={styles.year_picker}
      value={`${selectedYear}`}
      onChange={event => setStudsYear(parseInt(event.target.value))}
    >
      <option value='2020'>2020</option>
      <option value='2021'>2021</option>
      <option value='2022'>2022</option>
    </select>
  )
}

YearPicker.propTypes = {
  setStudsYear: PropTypes.func.isRequired,
  selectedYear: PropTypes.number.isRequired,
}
