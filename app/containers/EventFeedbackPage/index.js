// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventFeedback from 'components/EventFeedback'

type Props = {|
  +eventFeedback: Object,
|}

class EventFeedbackPage extends Component<Props, {}> {
  render() {
    console.log(this.props)
    return <EventFeedback questions={this.props.eventFeedback.feedbackData} />
  }
}

function mapStateToProps(state) {
  const eventFeedback = state.getIn(['eventFeedback'])
  return {
    eventFeedback,
  }
}

export default connect(
  mapStateToProps,
  null
)(EventFeedbackPage)
