import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import IndicatorIcon from '../IndicatorIcon'
import styles from './styles.css'

function EventListItem(props) {
  const { event, user } = props
  return (
    <Link to={`/events/${event.id}`}>
      <div className={styles.eventListItem}>
        <div>
          { user && user.memberType === 'studs_member' ?
            <span>
              <IndicatorIcon
                ok={event.beforeSurveyReplied} />
              <IndicatorIcon ok={event.afterSurveyReplied} />
            </span>
            : null
          }
          {event.companyName}
        </div>
        <div>{event.date}</div>
      </div>
    </Link>
  )
}

EventListItem.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default EventListItem
