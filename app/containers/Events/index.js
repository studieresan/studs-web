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

export class Events extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getEvents()
    this.props.getUsers()
  }

  renderActions() {
    // if (!user || !user.permissions.includes('event')) { TODO
    //   return null
    // }
    return (
      <div className={styles.actions}>
        <Link
          to="/events/new"
          onClick={() => this.props.createNewEvent()}>
          <FormattedMessage {...messages.create} />
        </Link>
      </div>
    )
  }

  renderEventsList(events, user) {
    const items =
      events.items.map(e => <EventListItem key={e.id} event={e} user={user} />)
    return (
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <div><FormattedMessage {...messages.company} /></div>
            <div><FormattedMessage {...messages.date} /></div>
          </div>
          { items }
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
      update,
      save,
      companyUsers,
    } = this.props

    const eventEdit = e => e && (
      <EventEdit
        event={e}
        companies={events.companies}
        update={update}
        save={save}
        saving={events.saving}
        companyUsers={companyUsers}
      />
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
          master={this.renderEventsList(events, user)}
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
}

const mapStateToProps = selectEvents()

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...EventActions, getUsers }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
