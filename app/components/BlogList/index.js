import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'
import BlogPost from './blog'
import SearchBar from './searchbar'

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

const BlogList = ({ user, posts }) => {
  const [query, setQuery] = useState('')
  const [selectValue, setSelect] = useState(0)

  return (
    <div className={styles.searchContainer}>
      <SearchBar
        setQuery={setQuery}
        query={query}
        selectValue={selectValue}
        setSelect={setSelect}
      />

      <BlogPost posts={posts} query={query} selectValue={selectValue} />
    </div>
  )
}

// {posts.length !== 0 ? posts : []}
//       {/* Exempel bara på huur userACtions kan användas typ*/}
//       <UserActions user={user} />

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
}

BlogList.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogList
