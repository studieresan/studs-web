import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'
import { getOldEvents } from 'containers/OldEvents/actions'
import { getEvents } from 'containers/Events/actions'

import styles from './styles.css'
import PublicEvent from 'components/PublicEvent'
import PublicEventMenu from 'components/PublicEventMenu'

class PublicEvents extends React.Component {
  componentDidMount() {
    this.props.getOldEvents()
    this.props.getEvents()

    Events.scrollEvent.register('begin')
    Events.scrollEvent.register('end')

    scrollSpy.update()
    animateScroll.scrollTo(1)
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  render() {
    const { oldEvents, events } = this.props

    return (
      <div className={styles.publicEvents}>
        <PublicEventMenu events={events} oldEvents={oldEvents} />
        <div className={styles.eventList}>
          {events.map(e => (
            <PublicEvent key={e.id} {...e} />
          ))}
          {oldEvents.map(e => (
            <PublicEvent key={e.id} {...e} />
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    oldEvents: state
      .getIn(['oldEvents', 'items'])
      .toJS()
      .filter(e => e.published)
      .sort((a, b) => a.date - b.date),
    events: state
      .getIn(['events', 'items'])
      .toJS()
      .filter(e => e.published)
      .sort((a, b) => a.date - b.date),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOldEvents: () => dispatch(getOldEvents()),
    getEvents: () => dispatch(getEvents()),
  }
}

PublicEvents.propTypes = {
  getOldEvents: PropTypes.func.isRequired,
  oldEvents: PropTypes.array,
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      company: PropTypes.string,
    }),
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicEvents)
