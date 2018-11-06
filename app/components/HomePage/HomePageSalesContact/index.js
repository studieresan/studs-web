import React from 'react'
import { FormattedMessage } from 'react-intl'
import Section from 'components/Section'
import styles from './styles.css'
import messages from './messages'
import Nils from 'static/img/people/nils.jpg'

const CONTACT_NAME = 'Nils Streijffert'
const CONTACT_PHONE_NUMBER = '+4670-1440857'
const CONTACT_EMAIL = 'studs-salj@d.kth.se'

const HomePageSalesContact = () =>
  <div className={styles.contact}>
    <Section {...messages.contact} />
    <div className={styles.contactInfo}>
      <img src={Nils}/>
      <div>
        <b>{CONTACT_NAME}</b>
        <br/>
        <FormattedMessage {...messages.contact.phone} />{': '}
        <a href={`tel:${CONTACT_PHONE_NUMBER}`}>{`${CONTACT_PHONE_NUMBER}`}</a>
        <br/>
        <span>{'Email: '}</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
    </div>
  </div>

export default HomePageSalesContact
