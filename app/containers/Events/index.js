import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectEvents from 'store/events/selectors'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import MasterDetail from 'components/MasterDetail'
import EventList from 'components/EventList'
import EventDetail from 'components/EventDetail'
import EventStaticDetail from 'components/EventStaticDetail'
import EventEdit from 'components/EventEdit'
import * as EventActions from 'store/events/actions'
import { getUsers } from 'containers/Members/actions'
import { loadSoldCompanies } from 'store/salesTool/companies/actions'

const WARNING =
  'Are you sure you wish to delete this event? ' +
  'This action cannot be undone.'

export class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
      selectedYear: 2020,
    }

    this.handleYearChange = this.handleYearChange.bind(this)
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

  handleYearChange(event) {
    this.setState({ selectedYear: Number(event.target.value) })
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

    const filteredEvents = events
      .get('items')
      .toJS()
      .filter(({ studsYear }) => studsYear === this.state.selectedYear)
    if (params.id) {
      const event = filteredEvents.find(e => e.id === params.id)
      if (path === '/events/:id/edit') {
        // event will be undefined on initial page load
        detail = <EventEdit event={event} {...this.props} />
      } else {
        detail = event && (
          <EventDetail
            event={event}
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
      <EventList
        events={events}
        filteredEvents={filteredEvents}
        user={user}
        params={params}
        path={path}
      />
    )

    return (
      <div className={styles.events}>
        <header className={styles.events_title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
          <select
            value={this.state.selectedYear}
            onChange={this.handleYearChange}
          >
            <option value='2021'>2021</option>
            <option value='2020'>2020</option>
            <option value='2019'>2019</option>
            <option value='2018'>2018</option>
          </select>
        </header>
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
