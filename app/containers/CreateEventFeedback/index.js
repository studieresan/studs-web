// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { formToObject } from 'utils'
import template, { addResponses } from './template'
import { setFeedback } from './actions'
import Fieldset from './Fieldset'
import styles from './styles.css'

type Props = {|
  +history: {
    +push: string => void,
  },
  +setFeedbackData: (string, Array<Object>) => void,
|}

class CreateEventFeedback extends Component<Props, {}> {
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
    this.props.setFeedbackData('Some name', templateWithResponses)
    this.props.history.push('/event-feedback')
  }

  render() {
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

function mapDispatchToProps(dispatch: Function) {
  return {
    setFeedbackData: (name, data) => {
      dispatch(setFeedback(name, data))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateEventFeedback)
