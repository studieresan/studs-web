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
import EventDetail from 'components/EventDetail'
import EventStaticDetail from 'components/EventStaticDetail'
import EventEdit from 'components/EventEdit'
import * as EventActions from './actions'
import { getUsers } from 'containers/Members/actions'
import { hasEventPermission } from 'users'

const WARNING = 'Are you sure you wish to delete this event? ' +
  'This action cannot be undone.'

export class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
    this.onDeleteEvent = this.onDeleteEvent.bind(this)
  }

  componentDidMount() {
    this.props.getEvents()
    this.props.getUsers()
  }

  onDeleteEvent(id) {
    if (confirm(WARNING)) {
      this.props.removeEvent(id)
    }
  }

  renderActions() {
    const { user } = this.props
    if (hasEventPermission(user)) {
      return (
        <div className={styles.actions}>
          <Link
            to="/events/new"
            onClick={() => this.props.createNewEvent()}>
            <FormattedMessage {...messages.create} />
          </Link>
        </div>
      )
    } else return null
  }

  renderEventsList(events, user, params, path) {
    const eventListItem = (event, isSelected) => (
      <EventListItem
        key={event.id}
        event={event}
        user={user}
        isSelected={isSelected}
      />
    )

    const items =
      events.items
        .sort((a, b) => a.date - b.date)
        .map(event => eventListItem(event, event.id === params.id))

    const newEventListItem = events.newEvent &&
      eventListItem(events.newEvent, path === '/events/new')

    return (
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <div><FormattedMessage {...messages.company} /></div>
            <div><FormattedMessage {...messages.date} /></div>
          </div>
          { items }
          { newEventListItem }
        </div>
        { this.renderActions(user) }
      </div>
    )
  }

  render() {
    const {
      events,
      user,
      match: { params, path },
    } = this.props

    const eventEdit = e => e && (
      <EventEdit event={e} />
    )

    let detail
    let detailSelected = false
    if (params.id) {
      const event = events.items.find(e => e.id == params.id)
      if (path === '/events/:id/edit') {
        detail = eventEdit(event)
      } else {
        detail = event && <EventDetail
          event={event}
          user={user}
          id={params.id}
          onRemoveEvent={this.onDeleteEvent}
        />
      }
      detailSelected = true
    } else if (path === '/events/new') {
      detail = eventEdit(events.newEvent)
      detailSelected = true
    } else {
      detail = <EventStaticDetail />
    }

    return (
      <div className={styles.events}>
        <MasterDetail
          master={this.renderEventsList(events, user, params, path)}
          detail={detail}
          detailSelected={detailSelected} />
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
  createNewEvent: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Events)
