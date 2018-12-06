// @flow
import React, { Component } from 'react'
import template from './template'
import Fieldset from './Fieldset'
import styles from './styles.css'

class CreateEventFeedback extends Component<null, null> {
  render() {
    return (
      <div className={styles.container}>
        <form className={styles.form}>
          <h1>Event feedback</h1>
          {template.map(question => (
            <Fieldset key={question.title} {...question} />
          ))}
        </form>
      </div>
    )
  }
}

export default CreateEventFeedback
