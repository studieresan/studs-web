import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LogoPng from 'static/img/logo/studs20.png'
import messages from './messages'
import navigationMessages from 'containers/Navbar/messages'
import styles from './styles.css'

const Menu = ({ loggedIn }) => (
  <div className={styles.menu}>
    <img src={LogoPng} className={styles.logoDesktop} />
    <img src={LogoPng} className={styles.logoMobile} />
    <Pitch />
    <nav className={styles.navigation}>
      <MenuItem to='/about'>
        <FormattedMessage {...navigationMessages.about} />
      </MenuItem>
      <MenuItem to='/events/public'>
        <FormattedMessage {...navigationMessages.pastEvents} />
      </MenuItem>
      {!loggedIn && (
        <MenuItem to='/login'>
          <FormattedMessage {...navigationMessages.login} />
        </MenuItem>
      )}
    </nav>
  </div>
)

function mapStateToProps(state) {
  return {
    loggedIn: state.getIn(['global', 'loggedIn']),
  }
}

Menu.propTypes = {
  loggedIn: PropTypes.bool,
}

const MenuItem = ({ to, children }) => (
  <Link to={to}>
    <h4>{children}</h4>
  </Link>
)

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const Pitch = () => (
  <p className={styles.pitch}>
    <FormattedMessage {...messages.shortPitch} />
  </p>
)

export default connect(mapStateToProps)(Menu)
