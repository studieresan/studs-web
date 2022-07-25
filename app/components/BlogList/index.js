import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'
import BlogPost from './blog'
import SearchBar from './searchbar'
import Spinner from '../Spinner'

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

const BlogList = ({ user, posts, loading }) => {
  const [query, setQuery] = useState('')
  const [selectValue, setSelect] = useState(0)

  return (
    <div>
      <div>
        <SearchBar
          setQuery={setQuery}
          query={query}
          selectValue={selectValue}
          setSelect={setSelect}
        />
      </div>
      <div>
        {!loading ? (
          <BlogPost posts={posts} query={query} selectValue={selectValue} />
        ) : (
          <Spinner> </Spinner>
        )}
      </div>
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
  loading: PropTypes.bool.isRequired,
}

export default BlogList
