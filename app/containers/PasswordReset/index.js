/*
 *
 * User password reset
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import * as actions from './actions'
import styles from './styles.css'

export class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const inputChange = {}
    inputChange[event.target.name] = event.target.value
    this.props.updatePassword(inputChange)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.reset(this.props.params.token)
  }

  render() {
    const { password, confirmPassword, error } = this.props
    return (
      <div className={styles.user}>
        <form onSubmit={this.handleSubmit} className={styles.content}>
          <h1 className={styles.header}>
            <FormattedMessage {...messages.title} />
          </h1>
          <div className='input-label'>
            <FormattedMessage {...messages.password} />
          </div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            placeholder='Password'/>
          <div className='input-label'>
            <FormattedMessage {...messages.confirmPassword} />
          </div>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            placeholder='Confirm Password'/>
          <div className='button-wrapper'>
            <button type='submit' className='btn-bright'>Save</button>
          </div>
          {error ? <div>Error</div> : null}
        </form>
      </div>
    )
  }
}

PasswordReset.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  updatePassword: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return state.get('passwordReset').toJS()
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
