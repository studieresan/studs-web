/*
 * Navbar
 *
 * Fixed at the top of the site. Contains all navigation + language switching.
 *
 */

import React from 'react';
import Isvg from 'react-inlinesvg';
import styles from './styles.css';
import LocaleToggle from '../LocaleToggle'
import Logo from '../../static/img/studs-logo-small.svg';

export default class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
	  <div className={styles.navbar}>
      <LocaleToggle />
	  </div>
    );
  }
}
