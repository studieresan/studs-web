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

import { loggedIn } from '../../auth';
import { Link } from 'react-router';
import messages from './messages';
import { connect } from 'react-redux';
import User from '../User';
import * as actions from '../User/actions';

export class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    if(this.props.user.firstName === '') {
      this.props.getUser();
    }
  }

  menu() {
    if(this.props.user.firstName) {
      return (
        <ul className={styles.navbarMenu}>
          <li>
            <Link to="/logout"><FormattedMessage {...messages.logout} /></Link>
          </li>
          <li>
            <Link to="/user">{ this.props.user.firstName }</Link>
          </li>
          <li>
            <Link to="/members"><FormattedMessage {...messages.studsmembers} /></Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className={styles.navbarMenu} key={this.props.user}>
          <li>
            <Link to="/login"><FormattedMessage {...messages.login} /></Link>
          </li>
        </ul>
     );
    }
  }

  render() {
    const user = this.props.user;
    return (
	  <div className={styles.navbar}>
      <Link to="/"><img src={Logo} height={24} /></Link>
      { this.menu() }
      <LocaleToggle />
	  </div>
    );
  }
}

function mapStateToProps(state) {
  return state.get('user').toJS()
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);


