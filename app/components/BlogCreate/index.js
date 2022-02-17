import React from 'react'
import PropTypes from 'prop-types'
import EventListItem from 'components/EventListItem'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'

const BlogCreate = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.title} />
        <input name='title' type='text' />
      </div>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.description} />
        <textarea name='description' type='text' />
      </div>
    </div>
  )
}

BlogCreate.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogCreate
