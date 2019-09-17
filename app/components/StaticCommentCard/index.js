import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import styles from './styles.css'

import MemberImageTime from '../MemberImageTime'

const StaticCommentCard = ({ comment, startEditingComment, deleteComment }) => {
  return (
    <div className={styles.static_comment_container}>
      <MemberImageTime picture='cristian' timestamp={comment.timestamp} />
      <div className={styles.static_comment_card}>
        <div className={styles.comment_text}>{comment.text}</div>
        <div className={styles.card_actions}>
          <Button
            className={styles.small_button}
            onClick={() => startEditingComment(comment.id)}
          >
            Edit
          </Button>

          <Button
            color='danger'
            className={styles.small_button}
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

StaticCommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  startEditingComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

export default StaticCommentCard
