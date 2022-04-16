import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import PropTypes from 'prop-types'
import studsLogoPng from '../../static/img/logo/studs-transparent-1000px.png'
import sLogoPng from '../../static/img/logo/s-transparent-1000px.png'
import BlackMenuIcon from '../../static/img/icons/icon_menu_black.svg'
import CloseIcon from '../../static/img/icons/icon_close.svg'
import BlackCloseIcon from '../../static/img/icons/icon_close_black.svg'

import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NavLinks from './NavLinks'

class Nav extends React.Component {
  static defaultProps = {
    invert: true,
  }

  state = {
    collapsed: true,
  }

  componentDidUpdate(prevProps) {
    // Close nav menu when navigating
    if (prevProps.location !== this.props.location) {
      this.setState({ collapsed: true })
    }
  }

  handleMenuClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  render() {
    const { collapsed } = this.state
    const { loggedIn, user, invert } = this.props

    const menuClass = classNames(styles.collapse, {
      [styles.collapsed]: collapsed,
    })

    // if the menu is collapsed, add the invert class since the menu on mobile
    // has a dark background
    const useInvertColors = invert || !collapsed

    const navbarClasses = classNames(styles.navbar, styles.background, {
      [styles.open]: !collapsed,
      [styles.invert]: useInvertColors || !collapsed,
    })

    // if mobile view we use png-logo to avoid gradient being destroyed
    const logoDesktop = studsLogoPng
    const logoMobile = sLogoPng
    let menuIcon
    if (collapsed) {
      menuIcon = BlackMenuIcon
    } else {
      menuIcon = BlackCloseIcon
    }

    return (
      <nav className={navbarClasses}>
        <div className={styles.control}>
          <Link to='/'>
            <img className={styles.logoDesktop} src={logoDesktop} />
            <img className={styles.logoMobile} src={logoMobile} />
          </Link>
          <img src={menuIcon} height={32} onClick={this.handleMenuClick} />
        </div>
        <div className={menuClass}>
          <NavLinks loggedIn={loggedIn} user={user} />
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool,
  location: PropTypes.object,
  invert: PropTypes.bool,
}

function mapStateToProps(state) {
  const immutableUser = state.getIn(['global', 'user'])
  return {
    user: immutableUser ? immutableUser.toJS() : {},
    loggedIn: state.getIn(['global', 'loggedIn']),
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Nav)
)
