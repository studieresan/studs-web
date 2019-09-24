import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import styles from './styles.css'

const StaticContactCard = ({
  contactInfo,
  deleteContact,
  startEditingContact,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <div>
          <div>
            <b>Namn:</b> {contactInfo.name}
          </div>
          <div>
            <b>Nummer</b> {contactInfo.phoneNumber}
          </div>
          <div>
            <b>Mejl:</b> {contactInfo.email}
          </div>
        </div>
        <div>{contactInfo.comment}</div>
      </div>
      <div className={styles.card_actions}>
        <Button
          className={styles.small_button}
          onClick={() => startEditingContact(contactInfo.id)}
        >
          Edit
        </Button>
        <Button
          color='danger'
          className={styles.small_button}
          onClick={() => deleteContact(contactInfo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

StaticContactCard.propTypes = {
  contactInfo: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
  startEditingContact: PropTypes.func.isRequired,
}

export default StaticContactCard
