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
import Isvg from 'react-inlinesvg';
import messages from './messages';
import styles from './styles.css';
import Background from './background.jpg';
import Section from '../../components/Section';
import Logo from '../../static/img/studs-logo.svg';
import Front6 from '../../static/img/front-6.jpg';
import Front7 from '../../static/img/front-7.jpg';
import Front8 from '../../static/img/front-8.jpg';
import ImgDonia from '../../static/img/donia.jpg';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
	const backgroundImage = {
		background: `
		  linear-gradient(
			  rgba(90,90,90,0.3),
			  rgba(90,90,90,0.7)
		  ),
		  url(${ Front8 })`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
	};
	const sectionReversed = styles.section + ' ' + styles.reverse;
    return (
	  <div>
		  <div style={backgroundImage} className={styles.header}>
			  <div className={styles.headerContent} >
				  <div className={styles.headerContentLogo}>
					  <Isvg src={Logo}></Isvg>
				  </div>
				  <h1>
					  <FormattedMessage {...messages.intro.header} />
				  </h1>
				  <p>
					  <FormattedMessage {...messages.intro.content} />
				  </p>
			  </div>
		  </div>
		  <div className={styles.content}>
			  <div className={sectionReversed}>
				  <Section {...messages.description} />
				  <div className={styles.overlay} >
					  <img src={Front7}  />
				  </div>
			  </div>
			  <div className={styles.section}>
				  <Section {...messages.students} />
				  <div className={styles.overlay} >
					  <img src={Front6} />
				  </div>
			  </div>
		  </div>
		  <div className={styles.contact}>
			  <Section {...messages.contact} />
			  <div className={styles.contactInfo}>
				  <img src={ImgDonia} />
				  <div>
					  <FormattedMessage {...messages.contact.phone} />{": 072-525 08 94"}
					  <br/>
					  <span>{"Email: "}</span><a href="mailto:studs-salj@d.kth.se">{"studs-salj@d.kth.se"}</a>
				  </div>
			  </div>
		  </div>
	  </div>
    );
  }
}
