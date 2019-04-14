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
}

class CreateEventFeedback extends Component<Props, State> {
  state = {
    companyName: this.props.eventFeedback.companyName,
  }

  componentWillMount() {
    fetchAllEventFormsByEventId(this.props.match.params.id).then(res => {
      this.setState({ eventForms: res })
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
