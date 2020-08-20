// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LogoPng from 'static/img_new/logo/logotype-white.png'

//TODO: When logo exists, replace text of Studs21 with the mobile and desktop
//logos that are commented out below

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <h1
          className={styles.logoDesktop}
          style={{
            border: '5px solid white',
            color: 'white',
            textAlign: 'center',
          }}
        >
          Studs 21
        </h1>
        {/* <img className={styles.logoDesktop} src={LogoPng} />
        <img className={styles.logoMobile} src={LogoPng} /> */}
        <div className={styles.header_text}>
          <FormattedMessage {...messages.intro.about} />
        </div>
      </div>
    </div>
  )
}

export default HomePageHeader
