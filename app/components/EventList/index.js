import React from 'react'
import PropTypes from 'prop-types'
import EventListItem from '../../components/EventListItem'
import styles from './styles.css'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Link } from 'react-router-dom'
import { hasEventPermission } from '../../users'

function UserActions({ user }) {
  if (hasEventPermission(user)) {
    return (
      <div className={styles.actions}>
        <Link to='/events/new'>
          <FormattedMessage {...messages.create} />
        </Link>
      </div>
    )
  }
  return null
}

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
}

const EventList = ({ filteredEvents, events, user, params, path }) => {
  const eventListItem = (event, isSelected) => (
    <EventListItem
      key={event.id}
      event={event}
      user={user}
      isSelected={isSelected}
    />
  )

  const items = filteredEvents
    .sort((a, b) => a.date - b.date)
    .map(event => eventListItem(event, event.id === params.id))

  const newEventListItem =
    events.get('newEvent') &&
    eventListItem(events.get('newEvent').toJS(), path === '/events/new')

  const shouldShowNewEventItem = path === '/events/new'

  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <div>
            <FormattedMessage {...messages.company} />
          </div>
          <div>
            <FormattedMessage {...messages.date} />
          </div>
        </div>
        {items}
        {shouldShowNewEventItem && newEventListItem}
      </div>
      <UserActions user={user} />
    </div>
  )
}

EventList.propTypes = {
  events: PropTypes.object.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
}

export default EventList
