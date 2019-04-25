import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectEvents from './selectors'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import messages from './messages'
import styles from './styles.css'
import MasterDetail from 'components/MasterDetail'
import EventListItem from 'components/EventListItem'
import EventDetailPage from 'containers/EventDetailPage'
import EventStaticDetail from 'components/EventStaticDetail'
import EventEdit from 'components/EventEdit'
import * as EventActions from './actions'
import { getUsers } from 'containers/Members/actions'
import { hasEventPermission } from 'users'

const WARNING =
  'Are you sure you wish to delete this event? ' +
  'This action cannot be undone.'

export class Events extends React.Component {
  state = {
    selected: null,
  }

  componentDidMount() {
    this.props.getEvents()
    this.props.getUsers()
  }

  onDeleteEvent = id => {
    if (confirm(WARNING)) {
      this.props.removeEvent(id)
    }
  }

  static UserActions({ user }) {
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

  static EventsList({ events, user, params, path }) {
    const eventListItem = (event, isSelected) => (
      <EventListItem
        key={event.get('id')}
        event={event.toJS()}
        user={user}
        isSelected={isSelected}
      />
    )

    const items = events
      .get('items')
      .sort((a, b) => a.get('date') - b.get('date'))
      .map(event => eventListItem(event, event.get('id') === params.id))

    const newEventListItem =
      events.get('newEvent') &&
      eventListItem(events.get('newEvent'), path === '/events/new')

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
          {newEventListItem}
        </div>
        <Events.UserActions user={user} />
      </div>
    )
  }

  render() {
    const {
      events,
      user,
      match: { params, path },
    } = this.props

    let detail
    let detailSelected = false
    if (params.id) {
      const event = events.get('items').find(e => e.get('id') === params.id)
      if (path === '/events/:id/edit') {
        // event will be undefined on initial page load
        detail = <EventEdit event={event && event.toJS()} />
      } else {
        detail = event && (
          <EventDetailPage
            event={event.toJS()}
            user={user}
            id={params.id}
            onRemoveEvent={this.onDeleteEvent}
          />
        )
      }
      detailSelected = true
    } else if (path === '/events/new') {
      // We specifically want undefined here, not null, because null
      // will not trigger EventEdit to use its defaultProp
      let event = undefined
      if (events.get('newEvent') !== null) {
        event = events.get('newEvent').toJS()
      }
      detail = <EventEdit event={event} />
      detailSelected = true
    } else {
      detail = <EventStaticDetail />
    }

    const master = (
      <Events.EventsList
        events={events}
        user={user}
        params={params}
        path={path}
      />
    )

    return (
      <div className={styles.events}>
        <MasterDetail
          master={master}
          detail={detail}
          detailSelected={detailSelected}
        />
      </div>
    )
  }
}

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  companyUsers: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  addSurvey: PropTypes.func.isRequired,
  removeSurvey: PropTypes.func.isRequired,
}

const mapStateToProps = selectEvents()

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...EventActions, getUsers }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
