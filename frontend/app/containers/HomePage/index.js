/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import Background from './background.jpg';
import Logo from './logo-inverse.png';
import Section from '../../components/Section';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
	const backgroundImage = {
		background: `
		  linear-gradient(
			  rgba(133,133,133,0.5),
			  rgba(133,133,133,0.5)
		  ),
		  url(${ Background })`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};
	const sectionReversed = styles.section + ' ' + styles.reverse;
    return (
	  <div>
		  <div style={backgroundImage} className={styles.header}>
			  <div className={styles.headerContent} >
				  <img src={Logo} width={300} />
				  <h1>
					<FormattedMessage {...messages.intro.header} />
				  </h1>
				  <p>
					<FormattedMessage {...messages.intro.content} />
				  </p>
			  </div>
		  </div>
		  <div className={styles.content}>
			  <div className={styles.section}>
				  <img src={Background} height={400} />
				  <Section {...messages.description} />
			  </div>
			  <div className={sectionReversed}>
				  <img src={Background} height={400} />
				  <Section {...messages.students} />
			  </div>
		  </div>
	  </div>
    );
  }
}
