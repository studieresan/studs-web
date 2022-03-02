import React from 'react'
import messages from './messages'
import styles from './styles.css'
import PropTypes from 'prop-types'

const BlogPost = ({ posts }) => {
  return (
    <div className={styles.listContainer}>
      {posts.map(post => {
        return (
          <div key={post.id} id={post.id} className={styles.postsContainer}>
            <div>
              <img src={post.frontPicture} className={styles.post} />
              {console.log(post.id)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

BlogPost.propTypes = {
  posts: PropTypes.any,
}

export default BlogPost
