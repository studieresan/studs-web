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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import MemberHomePage from '../../components/MemberHomePage';
import Isvg from 'react-inlinesvg';
import messages from './messages';
import styles from './styles.css';
import Background from './background.jpg';
import Section from '../../components/Section';
import Logo from '../../static/img/studs-logo.svg';
import Front8 from '../../static/img/front-8.jpg';
import Front9 from '../../static/img/front-9.jpg';
import Front10 from '../../static/img/front-10.jpg';
import ImgDonia from '../../static/img/donia.jpg';
import Report2016 from '../../static/img/top-transparent.png';
import Report2016pdf from 'file-loader!../../static/Studs_16_report.pdf';
import * as actions from '../Members/actions';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getUsers();
	}

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
  const users = this.props.users.toJS();

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
					  <img src={Front9}  />
				  </div>
			  </div>
			  <div className={styles.section}>
				  <Section {...messages.students} />
				  <div className={styles.overlay} >
					  <img src={Front10} />
				  </div>
			  </div>
			  <div className={styles.members}>
			  	<div className={styles.membersTitle}>
						<h2 className={styles.members}>
						  <FormattedMessage {...messages.members.header} />
						</h2>
					</div>
	        { users.map(user => <MemberHomePage key={user.id} user={user}/>) }
			  </div>
		  </div>
		  <div className={styles.report}>
		  		<h1><FormattedHTMLMessage {...messages.report.last_year} /></h1>
		  		<a href={Report2016pdf}>
					  <img src={Report2016} />
				  </a>
		  </div>
		  <div className={styles.contact}>
			  <Section {...messages.contact} />
			  <div className={styles.contactInfo}>
				  <img src={ImgDonia} />
				  <div>
					  <FormattedMessage {...messages.contact.phone} />{": 073-525 08 94"}
					  <br/>
					  <span>{"Email: "}</span><a href="mailto:studs-salj@d.kth.se">{"studs-salj@d.kth.se"}</a>
				  </div>
			  </div>
		  </div>
	  </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users'])
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
