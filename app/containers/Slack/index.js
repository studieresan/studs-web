import React, { Component } from 'react'
import styles from './styles.css'
import { SlackComponent } from 'compontent/Slack/index'

class Slack extends Component {
  render() {
    return (
      <div className='container'>
        <div>
          <SlackComponent />
        </div>
      </div>
    )
  }
}

export default Slack
