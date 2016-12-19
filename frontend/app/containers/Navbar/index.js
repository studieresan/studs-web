/*
 * Navbar
 *
 * Fixed at the top of the site. Contains all navigation + language switching.
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import Isvg from 'react-inlinesvg';
import styles from './styles.css';
import LocaleToggle from '../LocaleToggle'
import Logo from '../../static/img/studs-text.png';
import MenuIcon from './icon_menu.svg';
import CloseIcon from './icon_close.svg';

import { loggedIn } from '../../auth';
import { Link, withRouter } from 'react-router';
import messages from './messages';
import { connect } from 'react-redux';
import User from '../User';
import * as actions from '../User/actions';

export class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.menu = this.menu.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  handleMenuClick() {
    this.setState({collapsed: !this.state.collapsed});
  }

  componentWillMount() {
    this.props.router.listenBefore(() => {
      this.setState({collapsed: true});
    });
  }

  menu() {
    if(this.props.user) {
      const user = this.props.user.toJS();
      return (
        <ul className={styles.navbarMenu}>
          <li>
            <Link to="/logout"><FormattedMessage {...messages.logout} /></Link>
          </li>
          { user.type === 'studs_member' ?
            <li>
              <Link to="/user">{ user.firstName }</Link>
            </li>
            : null
          }
          <li>
            <Link to="/members"><FormattedMessage {...messages.studsmembers} /></Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className={styles.navbarMenu}>
          <li>
            <Link to="/login"><FormattedMessage {...messages.login} /></Link>
          </li>
        </ul>
     );
    }
  }

  render() {
    let collapsed = styles.collapse;
    collapsed += this.state.collapsed ? ' ' + styles.collapsed : '';
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
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user'])
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));


