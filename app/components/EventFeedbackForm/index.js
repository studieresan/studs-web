import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
// import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import styles from './styles.css'

export class EventFeedbackForm extends Component {
  render() {
    const {
      event,
      //user,
    } = this.props

    const values = ['1', '2', '3', '4', '5']

    console.log(values)
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h1>Pre Event feedback: {event.companyName}</h1>
          <fieldset>
            <h2>
              <legend>This is a text question</legend>
            </h2>
            <label>
              <span>Put each comment on its own line</span>
              <textarea name='test1' required defaultValue='' />
            </label>
          </fieldset>
          <fieldset>
            <h2>
              <legend>This is a radio question</legend>
            </h2>
            <div className={styles.inputGroup}>
              <label />
              {values.map(value => (
                <label key={value}>{value}</label>
              ))}
              <label />
              <label>Not at all interested.</label>
              {values.map(value => (
                <input key={value} type='radio' value={value} name='test2' />
              ))}
              <label>Very interested.</label>
            </div>
          </fieldset>
          {/* {eventFeedback.feedbackData.map(question => (
                <Fieldset key={question.title} {...question} />
                ))} */}
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
