// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LocaleToggle from '../LocaleToggle'

type Props = {
  loggedIn: boolean,
  user: Object,
}

/**
 * Component for the actual links in the navbar.
 * Extracted into its own component since it is kind of big.
 */
function NavLinks({ loggedIn, user }: Props) {
  let userLinks
  if (loggedIn) {
    userLinks = (
      <React.Fragment>
        <li>
          <Link to='/user'>{user.firstName || 'Profile'}</Link>
        </li>
        <li>
          <Link to='/apply'>
            <FormattedMessage {...messages.apply} />
          </Link>
        </li>
        <li>
          <Link to='/members'>
            <FormattedMessage {...messages.studsmembers} />
          </Link>
        </li>
        <li>
          <Link to='/trip'>
            <FormattedMessage {...messages.trip} />
          </Link>
        </li>
        <li>
          <Link to='/logout'>
            <FormattedMessage {...messages.logout} />
          </Link>
        </li>
      </React.Fragment>
    )
  } else {
    userLinks = (
      <li>
        <Link to='/login'>
          <FormattedMessage {...messages.login} />
        </Link>
      </li>
    )
  }

  return (
    <div className={styles.navLinks}>
      <ul className={styles.navbarMenu}>
        <li>
          <Link to='/apply'>
            <FormattedMessage {...messages.apply} />
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <FormattedMessage {...messages.about} />
          </Link>
        </li>
        {user.type !== 'studs_member' && (
          <li>
            <Link to='/events/public'>
              <FormattedMessage {...messages.pastEvents} />
            </Link>
          </li>
        )}
        {user.type === 'studs_member' && (
          <li>
            <Link to='/events/'>
              <FormattedMessage {...messages.pastEvents} />
            </Link>
          </li>
        )}
      </ul>
      <ul className={styles.navbarUserMenu}>
        <li>
          <LocaleToggle />
        </li>
        {userLinks}
      </ul>
    </div>
  )
}

export default NavLinks
