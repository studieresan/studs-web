import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'components/Button'
import styles from './styles.css'
import { preEventQuestions, postEventQuestions } from './template'
import * as EventActions from 'containers/Events/actions'
import { formToObject } from 'utils'

const scaleQuestion = (scale, name, labels) => {
  const radios = []
  for (let i = 1; i < scale + 1; i++) {
    radios.push(
      <label className={styles.horizontalRadioLabel} key={i}>
        <div>{i}</div>
        <div>
          <input type='radio' key={name + i} name={name} value={i} required />
        </div>
      </label>
    )
  }
  return (
    <div className={styles.inputGroup}>
      <div>
        <div>{labels[0]}</div>
      </div>
      {radios}
      <div>
        <div>{labels[1]}</div>
      </div>
    </div>
  )
}

const choiceQuestion = (name, labels) => {
  const radios = []
  for (const label of labels) {
    radios.push(
      <label className={styles.verticalRadioLabel} key={name + label}>
        <div>
          <input type='radio' name={name} value={label} required />
        </div>
        <div>{label}</div>
      </label>
    )
  }
  return radios
}

const textQuestion = name => {
  return (
    <label>
      <textarea name={name} defaultValue='' required />
    </label>
  )
}

const formatQuestion = question => {
  let content
  switch (question.type) {
    case 'choice':
      content = choiceQuestion(question.name, question.labels)
      break
    case 'scale':
      content = scaleQuestion(5, question.name, question.labels)
      break
    case 'response':
      content = textQuestion(question.name)
      break
    default:
      break
  }

  return (
    <fieldset key={question.title}>
      <h2>{question.title}</h2>
      {content}
    </fieldset>
  )
}

class EventFeedbackForm extends Component {
  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    const {
      events,
      //user
    } = this.props

    if (events.length < 1) {
      return null
    }

    const handleSubmit = e => {
      e.preventDefault()

      const formData = formToObject(e.target.elements)

      formData.eventId = this.props.match.params.id
      formData.userId = this.props.user.id
      console.log(formData)
    }

    let questions
    const preEvent =
      this.props.location.pathname &&
      this.props.location.pathname.includes('pre_form')
        ? true
        : false
    if (preEvent) {
      questions = preEventQuestions
    } else {
      questions = postEventQuestions
    }

    const form = questions.map(question => formatQuestion(question))

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>
            {
              this.props.events.find(
                event => event.id === this.props.match.params.id
              ).companyName
            }
            : Pre Event feedback
          </h1>
          {form}
          <div className={styles.submitWrapper}>
            <Button wrapper color='primary' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

EventFeedbackForm.propTypes = {
  user: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']).toJS(),
    events: state.getIn(['events', 'items']).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...EventActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFeedbackForm)
