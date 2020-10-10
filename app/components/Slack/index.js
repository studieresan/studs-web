import React, { Component } from 'react'

const SLACK_URL =
  'https://join.slack.com/t/studs21/shared_invite/zt-gf6fn60j-sNGehAhmmyaTlaSb8VF6Xw'

export class SlackComponent extends Component {
  componentDidMount() {
    window.location.replace(SLACK_URL)
  }

  render() {
    return (
      <div>
             <a href={SLACK_URL}>Gå med här</a>
      </div>
    )
  }
}
