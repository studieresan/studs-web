import React, { Component } from 'react'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdwdlZxUjjX1320FFkCrRHPvlM55eG2cZPwrjO1NajYlDdfLQ/viewform?usp=sf_link'

export class ApplicationComponent extends Component {
  componentDidMount() {
    window.location.replace(FORM_URL)
  }

  render() {
    return (
      <div>
        <a href={FORM_URL}>Sök här</a>
      </div>
    )
  }
}
