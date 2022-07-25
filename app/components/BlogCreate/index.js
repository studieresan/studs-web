import React, { Component, useEffect, useRef } from 'react'
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
import { removePost } from '../../containers/Blog/actions'

const BlogCreate = ({
  user,
  savePost,
  post,
  editPost,
  users,
  addPicture,
  removePicture,
  removeFrontPicture,
  match,
  setCurrentPost,
  removePost,
}) => {
  const picturesFileUpload = useRef()
  const frontPictureFileUpload = useRef()
  const textareaRef = useRef()

  post = post.toJS()

  useEffect(
    () => {
      const { params, path } = match
      if (
        params.hasOwnProperty('id') &&
        (post.title === '' || post.id !== params.id)
      ) {
        setCurrentPost(params.id)
      }

      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    },
    [post]
  )

  const handleChange = e => {
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'

    const data = {}
    switch (e.target.name) {
      case 'pictures':
        Object.values(e.target.files).forEach(file =>
          uploadImage(file).then(url => {
            addPicture(url)
          })
        )
        picturesFileUpload.current.value = ''
        break
      case 'frontPicture':
        Object.values(e.target.files).forEach(file =>
          uploadImage(file).then(url => {
            editPost({ frontPicture: url })
          })
        )
        frontPictureFileUpload.current.value = ''
        break
      default:
        data[e.target.name] = e.target.value
        editPost(data)
        break
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.author} />
        <select
          name='author'
          placeholder='Author'
          value={post.author.id}
          onClick={handleChange}
          onChange={handleChange}
        >
          <option key='none' value={''} disabled>
            Select responsible user
          </option>
          {users &&
            users.map(user => (
              <option key={user.realId} value={user.realId}>
                {user.firstName} {user.lastName}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.title} />
        <input
          name='title'
          type='text'
          defaultValue={post.title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.description} />
        <textarea
          ref={textareaRef}
          name='description'
          type='text'
          value={post.description}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.frontPicture} />
        <div className={styles.eventPictures}>
          {post.frontPicture !== '' && (
            <div className={styles.blogPicture} key={post.frontPicture}>
              <EventEditPicture
                url={post.frontPicture}
                onRemove={() => removeFrontPicture()}
              />
            </div>
          )}
        </div>
        <input
          ref={frontPictureFileUpload}
          type='file'
          name='frontPicture'
          onChange={handleChange}
          multiple={false}
        />
      </div>
      <div className={styles.inputLabel}>
        <FormattedMessage {...messages.pictures} />
        <div className={styles.eventPictures}>
          {post.pictures &&
            post.pictures.map((url, i) => (
              <div className={styles.blogPicture} key={url + i}>
                <div>{'image-' + i}</div>
                <EventEditPicture url={url} onRemove={() => removePicture(i)} />
              </div>
            ))}
        </div>
        <input
          ref={picturesFileUpload}
          type='file'
          name='pictures'
          onChange={handleChange}
          multiple
        />
      </div>
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonLeft}>
          <Button onClick={savePost}>
            <FormattedMessage {...messages.save} />
          </Button>
          {post.id !== '' && (
            <Button onClick={() => removePost(post.id)}>delete</Button>
          )}
        </div>
        <Link to='/blog'>
          <Button>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

BlogCreate.propTypes = {
  post: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  savePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  removeFrontPicture: PropTypes.func.isRequired,
  setCurrentPost: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,

  match: PropTypes.object.isRequired,
}

export default BlogCreate
