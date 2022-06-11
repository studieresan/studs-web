import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import EventListItem from 'components/EventListItem'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import EventEditPicture from 'components/EventEditPicture'
import { uploadImage } from 'api'
import { hasEventPermission } from '../../users'

const userActions = (user, post) => {
  if (hasEventPermission(user.toJS())) {
    return (
      <Link to={'/blog/edit/' + post.id}>
        <Button className={styles.edit}>
          <FormattedMessage {...messages.edit} />
        </Button>
      </Link>
    )
  }
  return null
}

const parseTemplate = post => {
  const text = post.description
  const template = text.split(new RegExp(/\s*\\(image-[0-9])\s*/, 'g'))
  if (template.length > 1) {
    const obj = template[1]
  }
  return template
}

const BlogCreate = ({ post, match, setCurrentPost, user }) => {
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
  const template = parseTemplate(post)
  return (
    <div className={styles.container}>
      <Link className={styles.gobackButton} to={'/blog'}>
        <i className='fa fa-arrow-left' />
      </Link>
      {userActions(user, post)}
      <h1 className={styles.title}>{post.title}</h1>

      {template.length > 0 &&
        template.map((obj, index) => {
          if (obj.includes('image-')) {
            return (
              <img
                key={index}
                src={post.pictures[parseInt(obj.charAt(obj.length - 1))]}
              />
            )
          } else {
            return <p className={styles.description}>{obj}</p>
          }
        })}
      {/*  <p className={styles.description}>{post.description}</p>
      <div className={styles.imageContainer}>
        {post.pictures.map((url, index) => {
          return <img key={index} src={url} />
        })}
      </div> */}
    </div>
  )
}

BlogCreate.propTypes = {
  setCurrentPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogCreate
