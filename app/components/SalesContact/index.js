import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import MemberImage from 'components/MemberImage'
import sale from 'static/img/people/sales.jpg'

const CONTACT_NAME = 'Andreas Wallström'
const CONTACT_PHONE_NUMBER = '+46 70-placeholder'
const CONTACT_EMAIL = 'awallst@kth.se'

const SalesContact = ({ className }) => (
  <div className={styles.contact + ' ' + className}>
    <div>
      <h1>
        <FormattedMessage {...messages.contact.header} />
      </h1>
      <p>
        <FormattedMessage {...messages.contact.content} />
      </p>
    </div>
    <div className={styles.contactInfo}>
      <Image picture={sale} round />
      <div>
        <b>{CONTACT_NAME}</b>
        <br />
        <FormattedMessage {...messages.contact.phone} />
        {': '}
        <a href={`tel:${CONTACT_PHONE_NUMBER}`}>{`${CONTACT_PHONE_NUMBER}`}</a>
        <br />
        <span>{'Email: '}</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
    </div>
  </div>
)

SalesContact.propTypes = {
  className: PropTypes.string,
}

const Image = ({ picture }) => (
  <MemberImage
    className={styles.contactPicture}
    picture={picture}
    size={119}
    square
    round
  />
)

Image.propTypes = {
  picture: PropTypes.string.isRequired,
}

export default SalesContact
