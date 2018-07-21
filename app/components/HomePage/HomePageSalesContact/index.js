import React from 'react'
import { FormattedMessage } from 'react-intl'
import Section from 'components/Section'
import styles from './styles.css'
import messages from './messages'
import PlaceholderPerson from 'static/img/person-placeholder.png'

const HomePageSalesContact = () =>
  <div className={styles.contact}>
    <Section {...messages.contact} />
    <div className={styles.contactInfo}>
      <img src={PlaceholderPerson}/>
      <div>
        <b>Nils Streijffert</b>
        <br/>
        <FormattedMessage {...messages.contact.phone} />{': +4670-144 08 57'}
        <br/>
        <span>{'Email: '}</span>
        <a href="mailto:studs-salj@d.kth.se">{'studs-salj@d.kth.se'}</a>
      </div>
    </div>
  </div>

export default HomePageSalesContact
