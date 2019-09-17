import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const CreateContactCard = ({ contactInfo, saveContact, hideCard }) => {
  const [name, setName] = useState(contactInfo ? contactInfo.name : '')
  const [phoneNumber, setPhoneNumber] = useState(
    contactInfo ? contactInfo.phoneNumber : ''
  )
  const [email, setEmail] = useState(contactInfo ? contactInfo.email : '')
  const [comment, setComment] = useState(contactInfo ? contactInfo.comment : '')
  return (
    <div className='card'>
      <div className='contact-card flex flex-col items-start mx-4'>
        <label>Namn</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <label>Telefonnummer</label>
        <input
          type='text'
          className='form-control'
          value={phoneNumber}
          onChange={event => setPhoneNumber(event.target.value)}
        />
        <label>Mejl</label>
        <input
          type='text'
          className='form-control'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label>Kommentar</label>
        <input
          type='text'
          className='form-control'
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>
      <div className='card-actions'>
        <Button
          color='primary'
          onClick={() => saveContact({ name, phoneNumber, email, comment })}
        >
          Save
        </Button>
        <Button color='danger' onClick={() => hideCard()}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

CreateContactCard.propTypes = {
  contactInfo: PropTypes.object.isRequired,
  saveContact: PropTypes.func.isRequired,
  hideCard: PropTypes.func.isRequired,
}

export default CreateContactCard
