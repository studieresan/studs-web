import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'
import { getOldEvents } from 'store/oldEvents/actions'
import { getEvents } from 'store/events/actions'

import styles from './styles.css'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import PublicEvent from 'components/PublicEvent'
import PublicEventMenu from 'components/PublicEventMenu'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

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
    const { oldEvents, events, saved } = this.props

    events.forEach(e => (e.companyName = e.company.name))
    return (
      <div>
        <div className={styles.events_title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        {!saved && <Spinner className={styles.spinner} />}
        {saved && (
          <div className={styles.public_events}>
            <PublicEventMenu
              events={events}
              oldEvents={oldEvents}
              saved={saved}
            />
            <div className={styles.event_list}>
              {events.map((e, idx) => [
                <PublicEvent key={e.id} {...e} index={idx} />,
                <div key={e.id + 'div'} className={styles.divider} />,
              ])}
              {oldEvents.map((e, idx) => [
                <PublicEvent key={e.id} {...e} index={idx} />,
                idx !== oldEvents.length - 1 && (
                  <div key={e.id + 'div'} className={styles.divider} />
                ),
              ])}
            </div>
          </div>
        )}
        <Footer hasBackground />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    oldEvents: state
      .getIn(['oldEvents', 'items'])
      .toJS()
      .filter(e => e.published),
    events: state
      .getIn(['events', 'items'])
      .toJS()
      .filter(e => e.published),
    saved:
      state.getIn(['events', 'saved']) || state.getIn(['oldEvents', 'saved']),
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
  saved: PropTypes.bool,
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
