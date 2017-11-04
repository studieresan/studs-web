/**
*
* PublicEventMenu
*
*/

import React from 'react';
import { Link } from 'react-scroll';

import styles from './styles.css';

const PublicEventMenu = ({events}) => {
  return (
    <div className={styles.publicEventMenu}>
      <h2>Events</h2>
      { events.map(e => <Link activeClass={styles.active} key={e.id} to={e.id} smooth={true} offset={-92} duration={400} spy={true}>{e.company.name}</Link>)}
    </div>
  );
}

export default PublicEventMenu;
