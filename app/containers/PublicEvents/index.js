import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'
import * as actions from 'containers/Events/actions'

import styles from './styles.css'
import PublicEvent from 'components/PublicEvent'
import PublicEventMenu from 'components/PublicEventMenu'

export class PublicEvents extends React.Component {
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
    const { events } = this.props

    return (
      <div className={styles.publicEvents}>
        <PublicEventMenu events={events} />
        <div className={styles.eventList}>
          { events.map(e => <PublicEvent key={e.id} {...e} />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.getIn(['events', 'items']).toJS().sort((a, b) => a.date - b.date),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

PublicEvents.propTypes = {
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      company: PropTypes.string,
    }),
  }),
}


export default connect(mapStateToProps, mapDispatchToProps)(PublicEvents)
