import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import MemberImageTime from '../../components/MemberImageTime'

import styles from './styles.css'

const CommentCard = ({
  comment,
  canEdit,
  userName,
  updateComment,
  deleteComment,
}) => {
  const [text, setText] = useState(comment.text)
  const [editing, setEditing] = useState(false)
  return (
    <div className={styles.comment_container}>
      <MemberImageTime
        name={userName}
        createdAt={comment.createdAt}
        picture={comment.user.picture}
      />
      <div className={styles.comment_card}>
        {editing ? (
          <input
            className={styles.comment_input}
            value={text}
            onChange={event => setText(event.target.value)}
          />
        ) : (
          <div className={styles.comment_text}>{text}</div>
        )}
        {canEdit && (
          <div className={styles.card_actions}>
            <Button
              color='primary'
              className={styles.small_button}
              onClick={() => {
                if (editing) {
                  updateComment(text)
                  setEditing(false)
                } else {
                  setEditing(true)
                }
              }}
            >
              {editing ? 'Save' : 'Edit'}
            </Button>
            <Button
              className={styles.small_button}
              color={editing ? 'default' : 'danger'}
              onClick={() => {
                if (editing) {
                  setEditing(false)
                } else {
                  if (
                    confirm('Are you sure you want to delete this comment?')
                  ) {
                    deleteComment()
                  }
                }
              }}
            >
              {editing ? 'Cancel' : 'Delete'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

export default CommentCard
