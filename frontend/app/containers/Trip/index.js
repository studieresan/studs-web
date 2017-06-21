/*
 *
 * Trip
 *
 */

import React from 'react';
import styles from './styles.css';

export class Trip extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.trip}>
        <h1>The trip</h1>
        <iframe src='https://www.juicer.io/api/feeds/studs17/iframe?starting-at=2017-06-13&after=hello()' frameBorder='0'/>
      </div>
    );
  }
}


export default Trip;
