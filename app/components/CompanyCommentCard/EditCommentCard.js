import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MemberImageTime from '../MemberImageTime'
import Button from 'components/Button'

import styles from './styles.css'

const EditCommentCard = ({ comment, saveComment, cancelEditingComment }) => {
  const [text, setText] = useState(comment.text)
  return (
    <div className={styles.comment_container}>
      <MemberImageTime
        picture={comment.user.picture}
        createdAt={comment.createdAt}
      />
      <div className={styles.comment_card}>
        <input
          className={styles.comment_input}
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <div className={styles.card_actions}>
          <Button
            color='primary'
            className={styles.small_button}
            onClick={() => saveComment(comment.id, text)}
          >
            Save
          </Button>
          <Button
            className={styles.small_button}
            onClick={() => cancelEditingComment(comment.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

EditCommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  saveComment: PropTypes.func.isRequired,
  cancelEditingComment: PropTypes.func.isRequired,
}

export default EditCommentCard
