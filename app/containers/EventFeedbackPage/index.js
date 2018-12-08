// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventFeedback from 'components/EventFeedback'
import type { Question } from 'containers/CreateEventFeedback/template'

type Props = {|
  +eventFeedback: {
    companyName: string,
    feedbackData: Array<Question>,
  },
|}

class EventFeedbackPage extends Component<Props, {}> {
  render() {
    const { companyName, feedbackData } = this.props.eventFeedback
    return <EventFeedback companyName={companyName} questions={feedbackData} />
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
