import React from 'react'
import styles from './styles.css'

export const YearPicker = () => {
  return (
    <select className={styles.year_picker}>
      <option value='2020' selected>
        2020
      </option>
      <option value='2021'>2021</option>
    </select>
  )
}
