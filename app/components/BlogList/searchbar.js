import React, { useState } from 'react'
import messages from './messages'
import styles from './styles.css'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

const SearchBar = props => {
  return (
    <div className={styles.headerContainer}>
      <input
        placeholder='sök här'
        className={styles.search}
        onChange={event => props.setQuery(event.target.value)}
      />

      <select
        className={styles.search}
        value={props.selectValue}
        onChange={event => props.setSelect(event.target.value)}
        placeholder='select'
        defaultValue={0}
      >
        {' '}
        <option value={0}>all</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
      </select>
    </div>
  )
}

SearchBar.propTypes = {
  posts: PropTypes.any,
  setQuery: PropTypes.any,
  setSelect: PropTypes.any,
  selectValue: PropTypes.any,
}

export default SearchBar
