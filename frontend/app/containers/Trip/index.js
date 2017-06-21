/*
 *
 * Trip
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

export class Trip extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.trip}>
        <iframe src='https://www.juicer.io/api/feeds/studs17/iframe' frameborder='0' width='1000' height='1000' style='display:block;margin:0 auto;'></iframe>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Trip);
