import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import MemberImageTime from 'components/MemberImageTime'
import styles from './styles.css'

const NewCommentCard = ({ currentUser, createComment }) => {
  const [text, setText] = useState('')
  return (
    <div className={styles.comment_container}>
      <MemberImageTime picture={currentUser.picture} />
      <div className={styles.comment_card}>
        <input
          className={styles.comment_input}
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder='Skriv här för att lägga till en ny kommentar'
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
