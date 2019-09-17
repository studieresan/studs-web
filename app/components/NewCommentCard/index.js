import React, { useState } from 'react'
import MemberImage from 'components/MemberImage'
import Button from 'components/Button'

import PropTypes from 'prop-types'
import styles from './styles.css'

const NewCommentCard = ({ createComment }) => {
  const [text, setText] = useState('')
  return (
    <div className={styles.new_coment_container}>
      <div className='profile-date-time-container'>
        {/* TODO: Change to user id of user logged in */}
        <MemberImage picture='cristian' size={'90'} square round />
      </div>
      <div className={styles.new_comment_card}>
        <input
          className={styles.new_comment_input}
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <div className={styles.card_actions}>
          <Button
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
}

export default NewCommentCard
