import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Section from 'components/Section'
import styles from './styles.css'
import messages from './messages'
import MemberImage from 'components/MemberImage'
import Nils from 'static/img/people/nils.jpg'

const CONTACT_NAME = 'Nils Streijffert'
const CONTACT_PHONE_NUMBER = '+4670-1440857'
const CONTACT_EMAIL = 'studs-salj@d.kth.se'
const CONTACT_ROLE = 'Head of Sales'

const HomePageSalesContact = () => (
  <div className={styles.contact}>
    <Section {...messages.contact} />
    <div className={styles.contactInfo}>
      <Image picture={Nils} round/>
      <div>
        <b>{CONTACT_NAME}</b>
        <br/>
        <span>{CONTACT_ROLE}</span>
        <br/>
        <FormattedMessage {...messages.contact.phone} />{': '}
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
  picture: PropTypes.string.isRequird,
}

export default HomePageSalesContact
