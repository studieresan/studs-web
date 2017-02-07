/**
*
* MemberHomePage
*
*/

import React from 'react';

import styles from './styles.css';

function MemberHomePage(props) {
  const { user } = props;
  return (
      <div className={styles.memberHomePage}>
        <div>
          <img src={user.picture} />
          { user.firstName}
        </div>
      </div>
  );
}

export default MemberHomePage;
