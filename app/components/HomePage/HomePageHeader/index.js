// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import Logo from 'static/img/logo/studs20.svg'
import Button from 'components/Button'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <img className={styles.logo} src={Logo} />
        <div className={styles.header_text}>
          <h3>
            <FormattedMessage {...messages.intro.about} />
          </h3>
        </div>
        <div className={styles.buttons}>
          <Button color='gold'>
            <FormattedMessage {...messages.intro.application} />
          </Button>
          <Button color='gold'>
            <FormattedMessage {...messages.intro.learnMore} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePageHeader
