import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import PropTypes from 'prop-types'

import LogoInvert from 'static/img_new/logo/logomark-square-white.png'
import LogoPng from 'static/img_new/logo/logomark-square-black.png'

import MenuIcon from 'static/img_new/icons/icon_menu.svg'
import BlackMenuIcon from 'static/img_new/icons/icon_menu_black.svg'
import CloseIcon from 'static/img_new/icons/icon_close.svg'
import BlackCloseIcon from 'static/img_new/icons/icon_close_black.svg'

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
    const logoDesktop = useInvertColors ? LogoInvert : LogoPng
    const logoMobile = useInvertColors ? LogoInvert : LogoPng
    let menuIcon
    if (collapsed) {
      menuIcon = useInvertColors ? MenuIcon : BlackMenuIcon
    } else {
      menuIcon = useInvertColors ? CloseIcon : BlackCloseIcon
    }

    return (
      <div className={navbarClasses}>
        <div className={styles.control}>
          <Link to='/'>
            <img className={styles.logoDesktop} src={logoDesktop} />
            <img className={styles.logoMobile} src={logoMobile} />
          </Link>
          <img src={menuIcon} height={24} onClick={this.handleMenuClick} />
        </div>
        <div className={menuClass}>
          <NavLinks loggedIn={loggedIn} user={user} />
        </div>
      </div>
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
