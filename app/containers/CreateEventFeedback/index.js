// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { formToObject } from 'utils'
import { addResponses, type Question } from './template'
import { setFeedback } from './actions'
import Fieldset from './Fieldset'
import MissingPeople from './MissingPeople'
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
  state: State = {
    companyName: this.props.eventFeedback.companyName,
    eventForms: [],
    aggregatedAnswers: {},
  }

  componentWillMount() {
    const eventId = this.props.match.params.id
    fetchAllEventFormsByEventId(eventId).then(eventForms => {
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
    history.push(`/events/${this.props.match.params.id}/event-feedback`)
  }

  handleCompanyNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ companyName: event.target.value })
  }

  aggregateAnswers = question => {
    if (!question.name) return null

    // eventForms is an array where each element is a complete form response,
    // pre event forms and post event forms all in one array
    const { eventForms } = this.state
    // pick out all form responses with this particular question
    const formsWithThisQuestion = eventForms.filter(
      form => !!form[question.name]
    )
    // array of all answers for this question
    const answers = formsWithThisQuestion.map(form => form[question.name])

    // if response type, just return the array of answers directly,
    // formatting will be performed in Fieldset.js
    if (question.type === 'response') {
      return answers
    }

    // Choice questions have up to 5 answers. This objects corresponds to which
    // input in the fieldset will be filled out.
    const optionAnswers = [
      0, // "YES", "POSITIVE" or 1
      0, // "SOMEWHAT", "NEUTRAL" or 2
      0, // "NO", "NEGATIVE" or 3
      0, // 4
      0, // 5
    ]
    answers.forEach(answer => {
      let questionIdx
      if (['YES', 'POSITIVE'].includes(answer)) {
        questionIdx = 0
      } else if (['SOMEWHAT', 'NEUTRAL'].includes(answer)) {
        questionIdx = 1
      } else if (['NO', 'NEGATIVE'].includes(answer)) {
        questionIdx = 2
      } else {
        // Answer is for a 5scale question
        questionIdx = answer - 1
      }
      optionAnswers[questionIdx]++
    })
    return optionAnswers
  }

  render() {
    const { eventFeedback, match } = this.props
    const eventId = match.params.id

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h1>Event feedback</h1>
          <MissingPeople eventId={eventId} />
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
