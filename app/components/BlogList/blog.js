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
          //console.log(post)

          //for filter
          const studsYear = parseInt(post.date.substring(0, 4))

          console.log(selectVal, studsYear)

          // default, no query, no select year selected
          if (query === '' && selectVal === 0) {
            return post
          }
          // year selected, no query
          else if (selectVal !== 0 && query === '') {
            if (studsYear === selectVal) {
              return post
            }
          }
          // year selected with query
          else if (
            selectVal === studsYear &&
            post.title.toLowerCase().includes(query.toLowerCase())
          ) {
            console.log('here1')
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
            <Link
              to={'/blog/view/' + post.id}
              key={post.id}
              className={styles.postsContainer}
            >
              <img src={post.frontPicture} className={styles.image} />
              <h2 className={styles.title}>{post.title} </h2>
              <div className={styles.smallBox}>
                <div className={styles.profileContainer}>
                  <img
                    src={post.frontPicture}
                    className={styles.profilePicture}
                  />
                </div>

                <div className={styles.authorDate}>
                  <h2 className={styles.author}>Philip Song</h2>
                  <div className={styles.date}>
                    {post.date.substring(0, 10)}
                  </div>
                </div>
              </div>
            </Link>
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
