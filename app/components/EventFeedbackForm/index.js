import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
// import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import styles from './styles.css'

const createScaleRadios = (scale, name) => {
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
  return radios
}

const createRadios = (name, choices) => {
  const radios = []
  for (const [count, choice] of choices.entries()) {
    radios.push(
      <label className={styles.verticalRadioLabel} key={count}>
        <div>
          <input type='radio' name={name} value={choice} required />
        </div>
        <div>{choice}</div>
      </label>
    )
  }
  return radios
}

const fiveScaleQuestion = (title, labels) => {
  return (
    <fieldset>
      <h2>
        <legend>{title}</legend>
      </h2>
      <div className={styles.inputGroup}>
        <div>
          <div>{labels[0]}</div>
        </div>
        {createScaleRadios(5, title)}
        <div>
          <div>{labels[1]}</div>
        </div>
      </div>
    </fieldset>
  )
}

const textQuestion = title => {
  return (
    <fieldset>
      <h2>
        <legend>{title}</legend>
      </h2>
      <label>
        <textarea name={title} defaultValue='' required />
      </label>
    </fieldset>
  )
}

const choiceQuestion = (title, choices) => {
  return (
    <fieldset>
      <h2>{title}</h2>
      {createRadios(title, choices)}
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
          {textQuestion('This is a text question')}
          {fiveScaleQuestion('This is a radio question', [
            'Not at all interested.',
            'Very interested.',
          ])}
          {choiceQuestion('This is a choice question.', ['Yes.', 'No.'])}
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
