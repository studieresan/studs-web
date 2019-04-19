// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { formToObject } from 'utils'
import { addResponses, type Question } from './template'
import { setFeedback } from './actions'
import Fieldset from './Fieldset'
import styles from './styles.css'
import { fetchAllEventFormsByEventId } from '../../api'

type Props = {|
  +history: {
    +push: string => void,
  },
  +eventFeedback: {
    companyName: string,
    feedbackData: Array<Question>,
  },
  +match: {
    params: Object,
  },
  +setFeedbackData: (string, Array<Question>) => void,
|}

type State = {
  companyName: string,
  eventForms: Object,
  aggregatedAnswers: Object,
}

class CreateEventFeedback extends Component<Props, State> {
  state = {
    companyName: this.props.eventFeedback.companyName,
    eventForms: [],
    aggregatedAnswers: {},
  }

  componentWillMount() {
    fetchAllEventFormsByEventId(this.props.match.params.id).then(eventForms => {
      this.setState({ eventForms: eventForms })
      const object = {}

      this.props.eventFeedback.feedbackData.map(question => {
        object[question.name] = this.aggregateAnswers(question)
      })

      this.setState({ aggregatedAnswers: object })
    })
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const { setFeedbackData, history } = this.props
    const { companyName } = this.state

    event.preventDefault()
    const form = event.target

    // $FlowFixMe
    const formData = formToObject(form.elements)
    const templateWithResponses = addResponses(formData)
    setFeedbackData(companyName, templateWithResponses)
    history.push('/event-feedback')
  }

  handleCompanyNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ companyName: event.target.value })
  }

  aggregateAnswers = question => {
    if (!question.name) return null

    const answers = this.state.eventForms
      .filter(form => question.name && question.name in form)
      .map(form => {
        return form[question.name]
      })

    if (question.type === 'response') {
      return answers
    } else {
      const optionAnswers = {}
      answers.forEach(answer => {
        if (answer === 'YES' || answer === 'POSITIVE' || answer === true) {
          answer = 0
        } else if (
          answer === 'SOMEWHAT' ||
          answer === 'NEUTRAL' ||
          answer === false
        ) {
          answer = 1
        } else if (answer === 'NO' || answer === 'NEGATIVE') {
          answer = 2
        } else {
          answer--
        }
        answer in optionAnswers
          ? optionAnswers[answer]++
          : (optionAnswers[answer] = 1)
      })
      return optionAnswers
    }
  }

  render() {
    const { eventFeedback } = this.props
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h1>Event feedback</h1>
          <fieldset>
            <label>
              <h2>Company name</h2>
              <input
                value={this.state.companyName}
                onChange={this.handleCompanyNameChange}
                type='text'
                name='company-name'
                required
              />
            </label>
          </fieldset>
          {eventFeedback.feedbackData.map(question => (
            <Fieldset
              key={question.title}
              responses={
                question.type === 'response' && question.name
                  ? this.state.aggregatedAnswers[question.name]
                  : []
              }
              datasets={
                question.type !== 'response' && question.name
                  ? [{ data: this.state.aggregatedAnswers[question.name] }]
                  : []
              }
              answers={this.aggregateAnswers(question)}
              {...question}
            />
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

function mapStateToProps(state) {
  const eventFeedback = state.getIn(['eventFeedback'])
  return {
    eventFeedback,
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
  mapStateToProps,
  mapDispatchToProps
)(CreateEventFeedback)
