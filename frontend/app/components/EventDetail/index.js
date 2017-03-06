/**
*
* EventDetail
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl'; import { Link } from 'react-router'; import messages from './messages';
import styles from './styles.css';
import A from '../A';
import IndicatorIcon from '../IndicatorIcon'; function EventDetail(props) {
  const { event, user } = props;
  if(!event) {
    return null;
  }
  return (
    <div className={styles.eventDetail}>
      <div className={styles.head}>
        <h2><FormattedMessage {...messages.event} />: {event.companyName} - {event.date}</h2>
        { user && user.permissions.includes('event') ?
          <Link to={`/events/${event.id}/edit`} >
            <button className='btn-bright'>Edit</button>
          </Link>
        : null
        }
      </div>
      <div className={styles.info}>
        <div>
          <h4>Company</h4>
          <div>{event.companyName}</div>
        </div>
        { user && user.type === 'studs_member' ?
          <div>
            <h4>Surveys</h4>
            <div>
              <IndicatorIcon ok={event.beforeSurveyReplied} />
              <A target='_blank' href={event.beforeSurvey}><FormattedMessage {...messages.before} /></A>
            </div>
            <div>
              <IndicatorIcon ok={event.afterSurveyReplied} />
              <A target='_blank' href={event.afterSurvey}><FormattedMessage {...messages.after} /></A>
            </div>
          </div>
        : null
        }
      </div>
      <hr />
      <h2><FormattedMessage {...messages.description} /></h2>
      <div>{event.description}</div>
    </div>
  );
}

export default EventDetail;
