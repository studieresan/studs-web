/**
*
* EventStaticDetail
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function EventStaticDetail() {
  return (
    <div className={styles.eventStaticDetail}>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default EventStaticDetail;
