/**
*
* MembersStaticDetail
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function MembersStaticDetail() {
  return (
    <div className={styles.membersStaticDetail}>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default MembersStaticDetail;
