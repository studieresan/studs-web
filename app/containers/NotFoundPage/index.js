import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import messages from './messages'
import styles from './styles.css'

export default class NotFound extends React.Component {
  render() {
    return (
      <div className={styles.center}>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Link to='/'>
          Take me home
        </Link>
      </div>
    )
  }
}
