/**
*
* IndicatorIcon
*
*/

import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

function IndicatorIcon(props) {
  const className = cx({
    indicatorIcon: true,
    ok: props.ok,
  });
  return (
    <span className={className}>&#9679;</span>
  );
}

export default IndicatorIcon;
