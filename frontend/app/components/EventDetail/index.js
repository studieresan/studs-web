/**
*
* EventDetail
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl'; import { Link } from 'react-router'; import messages from './messages';
import styles from './styles.css';
import A from '../A';
import IndicatorIcon from '../IndicatorIcon';

function EventDetail(props) {
  const { event, user } = props;
  return (
    <div className={styles.eventDetail}>
      <div className={styles.head}>
        <h2><FormattedMessage {...messages.event} />: {event.company} - {event.date}</h2>
        { user && user.permissions.includes('admin') ? 
          <Link to={`/events/${event.id}/edit`} >
            <button className='btn-bright'>Edit</button>
          </Link>
        : null 
        }
      </div>
      <div className={styles.info}>
        <div>
          <h4>Company</h4>
          <div>{event.company}</div>
        </div>
        <div>
          <h4>Location</h4>
          <div>{event.location}</div>
        </div>
        <div>
          <h4>Contact</h4>
          <div>{event.contact}</div>
        </div>
        <div>
          <h4>Serveys</h4>
          <div>
            <IndicatorIcon ok={true} />
            <A target='_blank' href={event.beforeServey}><FormattedMessage {...messages.before} /></A>
          </div>
          <div>
            <IndicatorIcon ok={false} />
            <A href={event.afterServey}><FormattedMessage {...messages.after} /></A>
          </div>
        </div>
      </div>
      <hr />
      <h2><FormattedMessage {...messages.description} /></h2>
      <div>{event.description}</div>
    </div>
  );
}

export default EventDetail;
