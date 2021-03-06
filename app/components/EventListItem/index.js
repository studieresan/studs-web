import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import classnames from 'classnames'
import styles from './styles.css'

function EventListItem(props) {
  const { event, isSelected } = props
  const { date } = event
  const dateString = date && moment(date).format('MMM DD, HH:mm')
  const classes = classnames(styles.eventListItem, {
    [styles.selected]: isSelected,
  })
  return (
    <Link to={`/events/${event.id}`}>
      <div className={classes}>
        <div>{event.company.name}</div>
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
