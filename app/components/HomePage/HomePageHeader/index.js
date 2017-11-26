import React from 'react'
import { FormattedMessage } from 'react-intl'
import Isvg from 'react-inlinesvg'
import Logo from 'static/img/studs-logo.svg'
import styles from './styles.css'
import messages from './messages'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent} >
        <div className={styles.headerContentLogo}>
          <Isvg src={Logo}></Isvg>
        </div>
        <h1>
          <FormattedMessage {...messages.intro.header} />
        </h1>
        <p>
          <FormattedMessage {...messages.intro.content} />
        </p>
      </div>
    </div>
  )
}

export default HomePageHeader