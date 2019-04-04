import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as EventDetailActions from './actions'
import { EventDetail } from '../../components/EventDetail'

export class EventDetailPage extends React.Component {
  componentDidMount() {
    const { id, user } = this.props
    this.props.getEventForms(user.id, id)
  }

  render() {
    return (
      <EventDetail
        id={this.props.id}
        event={this.props.event}
        user={this.props.user}
        onRemoveEvent={this.props.onRemoveEvent}
        preEventFormReplied={Boolean(this.props.eventForms[0])}
        postEventFormReplied={Boolean(this.props.eventForms[1])}
      />
    )
  }
}

EventDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,
  getEventForms: PropTypes.func.isRequired,
  eventForms: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']).toJS(),
    eventForms: state.getIn(['eventFeedbackForm', 'eventForms']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...EventDetailActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailPage)
