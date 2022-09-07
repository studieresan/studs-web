import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectEvents from '../../store/events/selectors'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import MasterDetail from '../../components/MasterDetail'
import EventList from '../../components/EventList'
import EventDetail from '../../components/EventDetail'
import EventStaticDetail from '../../components/EventStaticDetail'
import EventEdit from '../../components/EventEdit'
import { YearPicker } from '../../components/YearPicker'
import * as EventActions from '../../store/events/actions'
import { getUsers } from '../../containers/Members/actions'
import { loadSoldCompanies } from '../../store/salesTool/companies/actions'

const WARNING =
  'Are you sure you wish to delete this event? ' +
  'This action cannot be undone.'

const Events = ({
  loadSoldCompanies,
  getEvents,
  getUsers,
  match,
  events,
  user,
  companies,
  users,
  removeEvent,
  ...props
}) => {
  const [selectedYear, setSelectedYear] = useState(2023)

  useEffect(() => {
    if (!events || !events.get('items').toJS().length) {
      getEvents()
    }
    if (!users || !Object.keys(users).length) {
      getUsers()
    }
    if (!companies || !Object.keys(companies.data).length) {
      loadSoldCompanies()
    }
  }, [])

  const filteredEvents = useMemo(
    () =>
      events
        .get('items')
        .toJS()
        .filter(({ studsYear }) => studsYear === selectedYear),
    [events, selectedYear]
  )

  const onDeleteEvent = id => {
    if (confirm(WARNING)) {
      removeEvent(id)
    }
  }

  const { params, path } = match
  const master = (
    <EventList
      events={events}
      filteredEvents={filteredEvents}
      user={user}
      params={params}
      path={path}
    />
  )

  const detailSelected = params.hasOwnProperty('id') || path === '/events/new'
  const event = events
    .get('items')
    .toJS()
    .find(e => e.id === params.id)
  const detail = (event &&
    params.id &&
    (path === '/events/:id/edit' ? (
      <EventEdit
        event={event}
        companies={companies}
        users={users}
        events={events}
        studsYear={selectedYear}
        {...props}
      />
    ) : (
      <EventDetail
        event={event}
        user={user}
        users={users}
        id={params.id}
        onRemoveEvent={onDeleteEvent}
      />
    ))) ||
    (path === '/events/new' && (
      <EventEdit
        event={events.get('newEvent').toJS()}
        companies={companies}
        users={users}
        events={events}
        studsYear={selectedYear}
        {...props}
      />
    )) || <EventStaticDetail />

  return (
    <React.Fragment>
      <header className={styles.events_title}>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <YearPicker
          selectedYear={selectedYear}
          setStudsYear={setSelectedYear}
        />
      </header>
      <MasterDetail
        master={master}
        detail={detail}
        detailSelected={detailSelected}
      />
    </React.Fragment>
  )
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
  setSurvey: PropTypes.func.isRequired,
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
