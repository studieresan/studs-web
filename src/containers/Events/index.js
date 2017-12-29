import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectEvents from './selectors'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import messages from './messages'
import styles from './styles.css'
import MasterDetail from '../../components/MasterDetail'
import EventListItem from '../../components/EventListItem'
import EventDetail from '../../components/EventDetail'
import EventStaticDetail from '../../components/EventStaticDetail'
import EventEdit from '../../components/EventEdit'
import * as actions from './actions'

export class Events extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.get()
    this.props.getCompanies()
  }

  renderActions(user) {
    if (!user || !user.permissions.includes('event')) {
      return null
    }
    return (
      <div className={styles.actions}>
        <Link to="/events/new"><FormattedMessage {...messages.create} /></Link>
      </div>
    )
  }

  renderEventsList(events, user) {
    const items =
      events.map(e => <EventListItem key={e.id} event={e} user={user} />)
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
      route,
      match: { params },
      update,
      save,
      create,
      importFormData,
      getMissingForms,
      remindBefore,
      remindAfter,
    } = this.props

    let detail
    let detailSelected = false
    if (params.id) {
      const event = events.items.find(e => e.id == params.id)
      if (route.name === 'events/edit') {
        detail = <EventEdit
          event={event}
          companies={events.companies}
          update={update}
          save={save}
          saving={events.saving}
          importFormData={importFormData}
        />
      } else {
        detail = <EventDetail
          event={event}
          user={user}
          id={params.id}
          getMissingForms={getMissingForms}
          remindAfter={remindAfter}
          remindBefore={remindBefore} />
      }
      detailSelected = true
    } else if (route.name === 'events/new') {
      detail = <EventEdit
        event={events.newEvent}
        companies={events.companies}
        create={create}
        update={update}
        save={save}
        saving={events.saving}
      />
      detailSelected = true
    } else {
      detail = <EventStaticDetail />
    }

    return (
      <div className={styles.events}>
        <MasterDetail
          master={this.renderEventsList(events.items, user)}
          detail={detail}
          detailSelected={detailSelected} />
      </div>
    )
  }
}

Events.propTypes = {
  get: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  importFormData: PropTypes.func.isRequired,
  getMissingForms: PropTypes.func.isRequired,
  remindBefore: PropTypes.func.isRequired,
  remindAfter: PropTypes.func.isRequired,
}

const mapStateToProps = selectEvents()

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
