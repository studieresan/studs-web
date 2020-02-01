import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectEvents from 'store/events/selectors'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import messages from './messages'
import styles from './styles.css'
import MasterDetail from 'components/MasterDetail'
import EventListItem from 'components/EventListItem'
import EventDetail from 'components/EventDetail'
import EventStaticDetail from 'components/EventStaticDetail'
import EventEdit from 'components/EventEdit'
import * as EventActions from 'store/events/actions'
import { getUsers } from 'containers/Members/actions'
import { loadSoldCompanies } from 'store/salesTool/companies/actions'
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
    this.props.loadSoldCompanies()
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
        <Events.UserActions user={user} />
      </div>
    )
  }

  render() {
    const {
      events,
      user,
      users,
      match: { params, path },
    } = this.props

    let detail
    let detailSelected = false
    if (params.id) {
      const event = events.get('items').find(e => e.get('id') === params.id)
      if (path === '/events/:id/edit') {
        // event will be undefined on initial page load
        detail = <EventEdit event={event && event.toJS()} {...this.props} />
      } else {
        detail = event && (
          <EventDetail
            event={event.toJS()}
            user={user}
            users={users}
            id={params.id}
            onRemoveEvent={this.onDeleteEvent}
          />
        )
      }
      detailSelected = true
    } else if (path === '/events/new') {
      const event = events.get('newEvent').toJS()
      detail = <EventEdit event={event} {...this.props} />
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
        <div className={styles.events_title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
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
  loadSoldCompanies: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,

  match: PropTypes.object.isRequired,

  events: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  soldCompanies: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,

  update: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,

  removeEvent: PropTypes.func.isRequired,

  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  addSurvey: PropTypes.func.isRequired,
  removeSurvey: PropTypes.func.isRequired,
}

const mapStateToProps = rootState => {
  const companies = rootState.getIn(['salesTool', 'companies'])
  const soldCompanies = rootState.getIn([
    'salesTool',
    'companies',
    'soldCompanies',
  ])
  const users = rootState.getIn(['members', 'users']).toJS()

  return {
    ...selectEvents()(rootState),
    companies,
    soldCompanies,
    users,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ ...EventActions, getUsers }, dispatch),
    loadSoldCompanies: () => dispatch(loadSoldCompanies()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
