import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import Button from 'components/Button'
import styles from './styles.css'
import { preEventQuestions, postEventQuestions } from './template'

const scaleQuestion = (scale, name, labels) => {
  const radios = []
  for (let i = 1; i < scale + 1; i++) {
    radios.push(
      <label className={styles.horizontalRadioLabel} key={i}>
        <div>{i}</div>
        <div>
          <input
            type='radio'
            key={'scale' + i}
            name={name}
            value={i}
            required
          />
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
  for (const [count, label] of labels.entries()) {
    radios.push(
      <label className={styles.verticalRadioLabel} key={count}>
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
      content = choiceQuestion(question.labels, question.name)
      break
    case 'scale':
      content = scaleQuestion(5, question.labels, question.name)
      break
    case 'response':
      content = textQuestion(question.name)
      break
    default:
      break
  }

  return (
    <fieldset>
      <h2>{question.title}</h2>
      {content}
    </fieldset>
  )
}

export class EventFeedbackForm extends Component {
  render() {
    const { events, user } = this.props

    console.log(this.props)
    console.log('events: ' + events)
    console.log('user: ' + user)

    const handleSubmit = e => {
      e.preventDefault()
      console.log('xd')
    }

    let questions
    if (
      this.props.location.pathname &&
      this.props.location.pathname.includes('pre-event')
    ) {
      questions = preEventQuestions
    } else {
      questions = postEventQuestions
    }

    let form

    for (const question in questions) {
      form.push(formatQuestion(question))
    }

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <h1>{event.companyName}: Pre Event feedback</h1> */}
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
  events: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    user: state.getIn(['global', 'user']).toJS(),
    events: state.getIn(['events']).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions }, dispatch)
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EventFeedbackForm)
)
