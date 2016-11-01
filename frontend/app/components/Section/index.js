import { FormattedMessage } from 'react-intl';
import React, { PropTypes } from 'react';
import styles from './styles.css';

function Section(props) {
	return (
	  <div>
		<h2 className={styles.header}>
		  <FormattedMessage {...props.header} />
		  <br/>
		  {'-'}
		</h2>
		<p>
		  <FormattedMessage {...props.content} />
		</p>
	  </div>
	);
}

export default Section;
