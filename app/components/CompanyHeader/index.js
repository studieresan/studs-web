import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const CompanyHeader = ({ name, updateName, back }) => {
  const [newName, setNewName] = useState(name)
  const [editing, setEditing] = useState(false)

  useEffect(
    () => {
      setNewName(name)
      setEditing(false)
    },
    [name]
  )

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
      {editing ? (
        <input
          className={styles.name_input}
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
      ) : (
        <div className={styles.header_text}>{name}</div>
      )}
      <div className={styles.header_icons}>
        {editing ? (
          <i
            className={styles.header_icon + ' fa fa-check ' + styles.primary}
            onClick={() => updateName(newName)}
          />
        ) : null}
        <i
          className={
            styles.header_icon +
            ' fa ' +
            (editing ? 'fa-window-close ' + styles.red : 'fa-edit')
          }
          onClick={() => setEditing(!editing)}
        />
      </div>
    </div>
  )
}

export default CompanyHeader

CompanyHeader.propTypes = {
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
}
