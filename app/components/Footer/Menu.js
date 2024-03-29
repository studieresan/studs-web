import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LogoBlack from '../../static/img/logo/logotype-black.png'
import LogoWhite from '../../static/img/logo/logotype-white.png'
import logo from '../../static/img/logo/studs-transparent-1000px.png'
import navigationMessages from '../../containers/Navbar/messages'
import styles from './styles.css'

const Menu = ({ loggedIn, hasBackground }) => (
  <div className={styles.menu}>
    <img src={logo} className={styles.logoDesktop} />
    <img src={logo} className={styles.logoMobile} />
    <nav
      className={
        styles.navigation +
        ' ' +
        (hasBackground ? styles.navigationColorInverted : '')
      }
    >
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
  hasBackground: PropTypes.bool,
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

export default connect(mapStateToProps)(Menu)
