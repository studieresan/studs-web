// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LogoPng from 'static/img_new/logo/logotype-white.png'
import Background from 'static/img_new/home/background.png'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <img className={styles.background} src={Background} />
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
            <Button color='border'>
              <FormattedMessage {...messages.intro.learnMore} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePageHeader
