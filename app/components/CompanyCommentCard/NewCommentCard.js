import React, { useState } from 'react'
import MemberImage from 'components/MemberImage'
import Button from 'components/Button'

import PropTypes from 'prop-types'
import styles from './styles.css'

const NewCommentCard = ({ currentUser, createComment }) => {
  const [text, setText] = useState('')
  return (
    <div className={styles.comment_container}>
      <div className={styles.current_user_picture}>
        <MemberImage
          picture={currentUser ? currentUser.picture : null}
          size={'90'}
          square
          round
        />
      </div>
      <div className={styles.comment_card}>
        <input
          className={styles.comment_input}
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <div className={styles.card_actions}>
          <Button
            className={styles.small_button}
            onClick={() => {
              setText('')
              createComment(text)
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

NewCommentCard.propTypes = {
  createComment: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default NewCommentCard
