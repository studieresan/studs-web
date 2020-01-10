// @flow
import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LogoPng from 'static/img_new/logo/logotype-white.png'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

function HomePageHeader() {
  const [showArrow, setShowArrow] = useState(true)

  useEffect(
    (window.onscroll = () => {
      setShowArrow(window.pageYOffset < 10)
    }),
    []
  )

  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <img className={styles.logoDesktop} src={LogoPng} />
        <img className={styles.logoMobile} src={LogoPng} />
        <div className={styles.header_text}>
          <FormattedMessage {...messages.intro.about} />
        </div>
      </div>
      {showArrow && <div className={styles.down_arrow}>V</div>}
    </div>
  )
}

export default HomePageHeader
