import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import Button from 'components/Button'
import styles from './styles.css'

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

const choiceQuestion = (title, labels) => {
  const radios = []
  for (const [count, label] of labels.entries()) {
    radios.push(
      <label className={styles.verticalRadioLabel} key={count}>
        <div>
          <input type='radio' name={title} value={label} required />
        </div>
        <div>{label}</div>
      </label>
    )
  }
  return radios
}

const textQuestion = title => {
  return (
    <label>
      <textarea name={title} defaultValue='' required />
    </label>
  )
}

const question = (type, title, labels, scale) => {
  let content
  switch (type) {
    case 'choice':
      content = choiceQuestion(title, labels)
      break
    case 'fiveScale':
      content = scaleQuestion(scale, title, labels)
      break
    case 'text':
      content = textQuestion(title)
      break
    default:
      break
  }

  return (
    <fieldset>
      <h2>{title}</h2>
      {content}
    </fieldset>
  )
}

export class EventFeedbackForm extends Component {
  render() {
    const {
      event,
      //user,
    } = this.props

    const handleSubmit = e => {
      e.preventDefault()
      console.log('xd')
    }

    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>{event.companyName}: Pre Event feedback</h1>
          {question('text', 'This is a text question')}
          {question(
            'fiveScale',
            'This is a radio question',
            ['Not at all interested.', 'Very interested.'],
            5
          )}
          {question('choice', 'This is a radio question', [
            'Not at all interested.',
            'Very interested.',
          ])}
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
  event: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFeedbackForm)
