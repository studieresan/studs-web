import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'
import BlogPost from './blog'

// Använd för att kolla om vi ska ha en knapp där eller inte (bara för users med permission)
function UserActions({ user }) {
  if (hasEventPermission(user)) {
    return (
      <div className={styles.actions}>
        <Link to='/blog/new'>
          <FormattedMessage {...messages.create} />
        </Link>
      </div>
    )
  }
  return null
}

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
}

const BlogList = ({ user, posts }) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <div>
          <FormattedMessage {...messages.company} />
        </div>

        <div>
          <FormattedMessage {...messages.date} />
        </div>
      </div>

      <BlogPost posts={posts} />
    </div>
  )
}

// {posts.length !== 0 ? posts : []}
//       {/* Exempel bara på huur userACtions kan användas typ*/}
//       <UserActions user={user} />

BlogList.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogList
