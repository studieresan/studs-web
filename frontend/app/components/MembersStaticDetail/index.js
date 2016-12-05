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
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    </div>
  );
}

export default MembersStaticDetail;
