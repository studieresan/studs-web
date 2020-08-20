import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LogoPng from 'static/img/logo/logotype-black.png'
import navigationMessages from 'containers/Navbar/messages'
import styles from './styles.css'

//TODO: When logo exists, replace text of Studs21 with the mobile and desktop
//logos that are commented out below

const Menu = ({ loggedIn }) => (
  <div className={styles.menu}>
    <h1
      className={styles.logoDesktop}
      style={{
        color: 'black',
        textAlign: 'center',
      }}
    >
      Studs 21
    </h1>
    {/* <img src={LogoPng} className={styles.logoDesktop} />
    <img src={LogoPng} className={styles.logoMobile} /> */}
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

export default connect(mapStateToProps)(Menu)
