/**
*
* EventListItem
*
*/

import React from 'react';
import { Link } from 'react-router';

import IndicatorIcon from '../IndicatorIcon';
import styles from './styles.css';

function EventListItem(props) {
  const { event } = props;
  return (
    <Link to={`/events/${event.id}`}>
      <div className={styles.eventListItem}>
        <div>
          <IndicatorIcon ok={false} /><IndicatorIcon ok={false} />
          {event.company}
        </div>
        <div>{event.date}</div>
      </div>
    </Link>
  );
}

export default EventListItem;
