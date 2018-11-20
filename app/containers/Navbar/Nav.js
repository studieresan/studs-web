// @flow
import React from 'react'
import classNames from 'classnames'
import styles from './styles.css'
import LogoInvert from 'static/img/logo/studs19_invert.svg'
import Logo from 'static/img/logo/studs19.svg'
import MenuIcon from './icon_menu.svg'
import BlackMenuIcon from './icon_menu_black.svg'
import CloseIcon from './icon_close.svg'
import BlackCloseIcon from './icon_close_black.svg'
import Isvg from 'react-inlinesvg'

import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NavLinks from './NavLinks'

type Props = {
  user: Object,
  loggedIn: boolean,
  location: Object,
  invert?: boolean,
}

type State = {
  collapsed: boolean,
}

class Nav extends React.Component<Props, State> {
  static defaultProps = {
    invert: false,
  }

  state = {
    collapsed: true,
  }

  componentDidUpdate(prevProps: Props) {
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

    const logo = useInvertColors ? LogoInvert : Logo
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
            <Isvg src={logo} className={styles.navbarLogo} />
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
