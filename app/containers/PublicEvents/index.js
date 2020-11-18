import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'
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
    const { events, saved } = this.props

    events.forEach(e => (e.companyName = e.company.name))
    return (
      <React.Fragment>
        <header className={styles.events_title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </header>
        {!saved && <Spinner className={styles.spinner} />}
        {saved && (
          <main className={styles.public_events}>
            <PublicEventMenu events={events} />
            <section className={styles.event_list}>
              {events.map((e, idx) => [
                <PublicEvent key={e.id} {...e} index={idx} />,
                idx !== events.length - 1 && (
                  <div key={e.id + 'div'} className={styles.divider} />
                ),
              ])}
            </section>
          </main>
        )}
        <Footer hasBackground />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state
      .getIn(['events', 'items'])
      .toJS()
      .filter(e => e.published),
    saved: state.getIn(['events', 'saved']),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(getEvents()),
  }
}

PublicEvents.propTypes = {
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
