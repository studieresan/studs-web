import React from 'react'
import { FormattedMessage } from 'react-intl'
import Section from 'components/Section'
import styles from './styles.css'
import messages from './messages'
import ImgElin from 'static/img/elin.png'

function HomePageSalesContact () {
  return (
    <div className={styles.contact}>
      <Section {...messages.contact} />
      <div className={styles.contactInfo}>
        <img src={ImgElin} />
        <div>
          <b>Elin Karagöz</b>
          <br/>
          <FormattedMessage {...messages.contact.phone} />{': 073-701 74 64'}
          <br/>
          <span>{'Email: '}</span>
          <a href="mailto:studs-salj@d.kth.se">{'studs-salj@d.kth.se'}</a>
        </div>
      </div>
    </div>
  )
}

export default HomePageSalesContact
