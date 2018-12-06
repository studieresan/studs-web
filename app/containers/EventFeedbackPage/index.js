// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventFeedback from 'components/EventFeedback'

type Props = {|
  +eventFeedback: {
    companyName: string,
    feedbackData: Array<Object>,
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
