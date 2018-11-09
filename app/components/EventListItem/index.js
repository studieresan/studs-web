import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'

import IndicatorIcon from 'components/IndicatorIcon'
import styles from './styles.css'

function EventListItem(props) {
  const { event, user, isSelected } = props
  const { date } = event
  const dateString = date && moment(date).format('HH:mm, MMM DD')
  const classes = classnames(styles.eventListItem, {
    [styles.selected]: isSelected,
  })
  return (
    <Link to={`/events/${event.id}`}>
      <div className={classes}>
        <div>
          {user && user.memberType === 'studs_member' && (
            <span>
              <IndicatorIcon ok={event.beforeSurveyReplied} />
              <IndicatorIcon ok={event.afterSurveyReplied} />
            </span>
          )}
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
  isSelected: PropTypes.bool,
}

export default EventListItem
