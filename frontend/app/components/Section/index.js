import { FormattedMessage } from 'react-intl';
import React, { PropTypes } from 'react';

function Section(props) {
	return (
	  <div>
		<h2>
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
