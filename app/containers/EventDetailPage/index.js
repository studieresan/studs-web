import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EventDetail } from 'components/EventDetail'

export class EventDetailPage extends React.Component {
  render() {
    return (
      <EventDetail
        id={this.props.id}
        event={this.props.event}
        user={this.props.user.toJS()}
        loggedIn={this.props.loggedIn}
        onRemoveEvent={this.props.onRemoveEvent}
      />
    )
  }
}

EventDetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']),
    loggedIn: state.getIn(['global', 'loggedIn']),
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailPage)
