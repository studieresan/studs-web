// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LogoPng from 'static/img/logo/studs20.png'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <img className={styles.logoDesktop} src={LogoPng} />
        <img className={styles.logoMobile} src={LogoPng} />
        <div className={styles.header_text}>
          <h3>
            <FormattedMessage {...messages.intro.about} />
          </h3>
        </div>
        <div className={styles.buttons}>
          <Link to='/about'>
            <Button color='gold'>
              <FormattedMessage {...messages.intro.learnMore} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePageHeader
