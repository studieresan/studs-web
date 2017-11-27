import React from 'react'
import { FormattedMessage } from 'react-intl'
import Isvg from 'react-inlinesvg'
import Logo from 'static/img/logo/White + Frame (16x10).svg'
import styles from './styles.css'
import messages from './messages'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent} >
        <div className={styles.headerContentLogo}>
          <Isvg src={Logo} />
        </div>
        <p>
          <FormattedMessage {...messages.intro.content} />
        </p>
      </div>
    </div>
  )
}

export default HomePageHeader