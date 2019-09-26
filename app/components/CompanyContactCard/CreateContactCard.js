import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import styles from './styles.css'

const CreateContactCard = ({ contactInfo, saveContact, hideCard }) => {
  const [name, setName] = useState(contactInfo ? contactInfo.name : '')
  const [phoneNumber, setPhoneNumber] = useState(
    contactInfo ? contactInfo.phoneNumber : ''
  )
  const [email, setEmail] = useState(contactInfo ? contactInfo.email : '')
  const [comment, setComment] = useState(contactInfo ? contactInfo.comment : '')
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <label>Namn</label>
        <input
          type='text'
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <label>Telefonnummer</label>
        <input
          type='text'
          value={phoneNumber}
          onChange={event => setPhoneNumber(event.target.value)}
        />
        <label>Mejl</label>
        <input
          type='text'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label>Kommentar</label>
        <input
          type='text'
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>
      <div className={styles.card_actions}>
        <Button
          color='primary'
          className={styles.small_button}
          onClick={() => saveContact({ name, phoneNumber, email, comment })}
        >
          Save
        </Button>
        <Button
          className={styles.small_button}
          color='danger'
          onClick={() => hideCard()}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

CreateContactCard.propTypes = {
  contactInfo: PropTypes.object,
  saveContact: PropTypes.func.isRequired,
  hideCard: PropTypes.func.isRequired,
}

export default CreateContactCard
