/*
 * Navbar
 *
 * Fixed at the top of the site. Contains all navigation + language switching.
 *
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import Isvg from 'react-inlinesvg'
import styles from './styles.css'
import LocaleToggle from '../LocaleToggle'
import Logo from '../../static/img/text-white-rgb.png'
import MenuIcon from './icon_menu.svg'
import CloseIcon from './icon_close.svg'

import { loggedIn } from '../../auth'
import { Link, withRouter } from 'react-router'
import messages from './messages'
import { connect } from 'react-redux'
import User from '../User'
import * as actions from '../User/actions'

export class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.menu = this.menu.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.state = {
      collapsed: true,
    }
  }

  handleMenuClick() {
    this.setState({collapsed: !this.state.collapsed})
  }

  componentWillMount() {
    this.props.router.listenBefore(() => {
      this.setState({collapsed: true})
    })
  }

  menu() {
    if (loggedIn()) {
      const user = this.props.user.toJS()
      return (
        <ul className={styles.navbarMenu}>
          <li>
            <Link to="/logout"><FormattedMessage {...messages.logout} /></Link>
          </li>
          <li>
            <Link to="/user">{ user.firstName }</Link>
          </li>
          <li>
            <Link to="/members">
              <FormattedMessage {...messages.studsmembers} />
            </Link>
          </li>
          {
            /* TODO <li>
              <Link to="/events">
                <FormattedMessage {...messages.internalevents} />
              </Link>
            </li>
            <li>
              <Link to="/events/public">
                <FormattedMessage {...messages.events} />
              </Link>
            </li> */
          }
          <li>
            <Link to="/trip"><FormattedMessage {...messages.trip} /></Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className={styles.navbarMenu}>
          <li>
            <Link to="/login"><FormattedMessage {...messages.login} /></Link>
          </li>
          <li>
            <Link to="/events/public">
              <FormattedMessage {...messages.events} />
            </Link>
          </li>
          <li>
            <Link to="/trip"><FormattedMessage {...messages.trip} /></Link>
          </li>
        </ul>
      )
    }
  }

  render() {
    let collapsed = styles.collapse
    collapsed += this.state.collapsed ? ' ' + styles.collapsed : ''
    return (
    <div className={styles.navbar}>
      <div className={styles.control}>
        <Link to="/"><img src={Logo} height={24} /></Link>
        <img
          src={this.state.collapsed ? MenuIcon : CloseIcon }
          height={26}
          onClick={this.handleMenuClick} />
      </div>
      <div className={ collapsed }>
        { this.menu() }
        <LocaleToggle />
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
