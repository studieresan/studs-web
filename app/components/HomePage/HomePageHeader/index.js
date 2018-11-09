// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <h1>
          <FormattedMessage {...messages.intro.headline} />
        </h1>
        <p className={styles.headerText}>
          <FormattedMessage {...messages.intro.content} />
        </p>
      </div>
    </div>
  )
}

export default HomePageHeader
