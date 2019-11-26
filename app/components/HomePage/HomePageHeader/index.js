// @flow
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LogoPng from 'static/img_new/logo/logotype-white.png'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

function HomePageHeader() {
  const [show, toggle] = useState(true)

  window.onscroll = () => {
    toggle(window.pageYOffset < 10)
  }

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
            <Button color='border'>
              <FormattedMessage {...messages.intro.learnMore} />
            </Button>
          </Link>
        </div>
      </div>
      {show && <div className={styles.down_arrow}>DOWN ARROW</div>}
    </div>
  )
}

export default HomePageHeader
