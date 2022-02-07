import React from 'react'
import PropTypes from 'prop-types'
import EventListItem from 'components/EventListItem'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'

const BlogCreate = ({ user }) => {
  return <div />
}

BlogCreate.propTypes = {
  user: PropTypes.object.isRequired,
}

export default BlogCreate
