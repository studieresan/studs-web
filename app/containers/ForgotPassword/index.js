import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import { requestPasswordReset } from '../../api'
import { push } from 'react-router-redux'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {email: ''}
  }

  handleChange(event) {
    this.setState({email: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    requestPasswordReset(this.state.email)
      .then(() => {
        this.props.push('/')
      })
      .catch(() => {
        this.setState({error: true})
      })
  }

  render() {
    const email = this.state.email
    return (
      <div className={styles.user}>
        <form onSubmit={this.handleSubmit} className={styles.content}>
          <h1 className={styles.header}>
            <FormattedMessage {...messages.title} />
          </h1>
          <div>
            <div className='input-label'>
              <FormattedMessage {...messages.email} />
            </div>
            <input
              type='text'
              name='email'
              value={email}
              onChange={this.handleChange}
              placeholder='Email'/>
            <div className='button-wrapper'>
              <button type='submit' className='btn-bright'>Reset</button>
            </div>
          </div>
          {this.state.error ? <div>Error</div> : null}
        </form>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  push: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ push }, dispatch)

export default connect(null, mapDispatchToProps)(ForgotPassword)
