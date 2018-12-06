// @flow
import React, { Component } from 'react'
import template, { addResponses } from './template'
import Fieldset from './Fieldset'
import Button from 'components/Button'
import { formToObject } from 'utils'
import styles from './styles.css'
import EventFeedback from './EventFeedback'

type State = {|
  data: Array<Object>,
|}

class CreateEventFeedback extends Component<null, State> {
  state = {
    data: [],
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target
    // $FlowFixMe
    console.log(form.elements)

    // $FlowFixMe
    const formData = formToObject(form.elements)
    console.log(formData)
    const templateWithResponses = addResponses(formData)
    console.log(templateWithResponses)
    this.setState({ data: templateWithResponses })
  }

  render() {
    const { data } = this.state

    if (data.length > 0) {
      return <EventFeedback questions={data} />
    }

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h1>Event feedback</h1>
          {template.map(question => (
            <Fieldset key={question.title} {...question} />
          ))}
          <div className={styles.submitWrapper}>
            <Button wrapper color='primary' type='submit'>
              Create feedback PDF
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateEventFeedback
