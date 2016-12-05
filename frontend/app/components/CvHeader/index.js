/**
*
* CvHeader
*
*/

import React, { PropTypes } from 'react';
import Logo from '../../static/img/stencil-black-rgb.png';

import styles from './styles.css';

function CvHeader(props) {
  const { user } = props;
  return (
    <div className={styles.header}>
      <div className={styles.contactWrapper}>
        <div className={styles.image} />
        <div className={styles.contact}>
          <div>{user.firstName} {user.lastName}</div>
          <div>Studying Computer Science @ KTH</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
        </div>
      </div>
      <div className={styles.logo}>
        <img src={Logo} />
      </div>
    </div>
  );
}

CvHeader.propTypes = {
  user: PropTypes.object.isRequired
};

export default CvHeader;
