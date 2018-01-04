import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { take, join } from 'lodash'
import IndicatorIcon from 'components/IndicatorIcon'
import styles from './styles.css'

function EventListItem(props) {
  const { event, user } = props
  const { date } = event
  const dateString = date && join(take(date.split(' '), 4), ' ')
  return (
    <Link to={`/events/${event.id}`}>
      <div className={styles.eventListItem}>
        <div>
          { user && user.memberType === 'studs_member' &&
            <span>
              <IndicatorIcon
                ok={event.beforeSurveyReplied} />
              <IndicatorIcon ok={event.afterSurveyReplied} />
            </span>
          }
          {event.companyName}
        </div>
        <div>{dateString}</div>
      </div>
    </Link>
  )
}

EventListItem.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default EventListItem
