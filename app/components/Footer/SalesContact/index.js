import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Section from 'components/Section'
import styles from './styles.css'
import messages from './messages'
import MemberImage from 'components/MemberImage'
import Cristian from 'static/img_new/people/cristian.jpg'

const CONTACT_NAME = 'Cristian Osorio Bretti'
const CONTACT_PHONE_NUMBER = '+46 70-782 65 60'
const CONTACT_EMAIL = 'cristian@studs.se'

const SalesContact = () => (
  <div className={styles.contact}>
    <Section {...messages.contact} />
    <div className={styles.contactInfo}>
      <Image picture={Cristian} round />
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
