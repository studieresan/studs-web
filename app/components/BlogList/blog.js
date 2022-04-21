import React, { useState, useEffect } from 'react'
import messages from './messages'
import styles from './styles.css'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

const BlogPost = ({ posts, query, selectValue }) => {
  const selectVal = parseInt(selectValue)
  return (
    <div className={styles.listContainer}>
      {posts
        .filter(post => {
          // default, no query, no select year selected
          if (query === '' && selectVal === 0) {
            return post
          }
          // year selected, no query
          else if (selectVal !== 0 && query === '') {
            if (post.studsYear === selectVal) {
              return post
            }
          }
          // year selected with query
          else if (
            selectVal === post.studsYear &&
            post.title.toLowerCase().includes(query.toLowerCase())
          ) {
            return post
          }

          // only query
          else if (
            post.title.toLowerCase().includes(query.toLowerCase()) &&
            selectVal === 0
          ) {
            return post
          }

          // no year selected only query
        })
        .map(post => {
          return (
            <div key={post.id} id={post.id} className={styles.postsContainer}>
              <h2 className={styles.title}>{post.title} </h2>
              <img src={post.frontPicture} className={styles.image} />
              <Link to={'/blog/new'}>
                <button type='button' className={styles.buton}>
                  READ MORE
                </button>
              </Link>
            </div>
          )
        })}
    </div>
  )
}

BlogPost.propTypes = {
  posts: PropTypes.any,
  query: PropTypes.any,
  setQuery: PropTypes.any,
  selectValue: PropTypes.any,
}

export default BlogPost
