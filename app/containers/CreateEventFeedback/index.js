// @flow
import React, { Component, Fragment } from 'react'
import template from './template'
import styles from './styles.css'

type Question = {|
  title: string,
  labels?: string[],
  type?: 'response' | '',
|}

function Fieldset({ title, labels, type }: Question) {
  let content
  if (type && type === 'response') {
    content = (
      <Fragment>
        <label>
          <span>Put each comment on its own line</span>
          <textarea />
        </label>
      </Fragment>
    )
  } else {
    content = (
      <div className={styles.inputGroup}>
        {labels &&
          labels.map(label => (
            <Fragment key={label}>
              <label>
                {label}
                <input type='text' />
              </label>
            </Fragment>
          ))}
      </div>
    )
  }
  return (
    <fieldset>
      <h2>
        <legend>{title}</legend>
      </h2>
      {content}
    </fieldset>
  )
}

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
