import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import EventListItem from 'components/EventListItem'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from 'users'
import Button from 'components/Button'
import EventEditPicture from 'components/EventEditPicture'
import { uploadImage } from 'api'

const BlogCreate = ({ post, match, setCurrentPost }) => {
  useEffect(() => {
    const { params, path } = match
    if (
      params.hasOwnProperty('id') &&
      (post.title === '' || post.id !== params.id)
    ) {
      setCurrentPost(params.id)
    }
  })
  post = post.toJS()

  return (
    <div className={styles.container}>
      <Link className={styles.gobackButton} to={'/blog'}>
        <i className='fa fa-arrow-left' />
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.description}>{post.description}</p>
      <div className={styles.imageContainer}>
        {post.pictures.map((url, index) => {
          return <img key={index} src={url} />
        })}
      </div>
    </div>
  )
}

BlogCreate.propTypes = {
  setCurrentPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default BlogCreate
