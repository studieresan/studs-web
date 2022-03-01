import React from 'react'
import PropTypes from 'prop-types'
import EventListItem from 'components/EventListItem'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'
import Button from 'components/Button'

const BlogCreate = ({ user, saveNewPost }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <Button onClick={saveNewPost}>
          <FormattedMessage {...messages.save} />
        </Button>
        <Button>
          <FormattedMessage {...messages.cancel} />
        </Button>
      </div>
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
  saveNewPost: PropTypes.func.isRequired,
}

export default BlogCreate
