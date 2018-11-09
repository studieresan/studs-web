import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button'
import messages from './messages'
import styles from './styles.css'
import { requestPasswordReset } from 'api'
import { push } from 'react-router-redux'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { email: '' }
  }

  handleChange(event) {
    this.setState({ email: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    requestPasswordReset(this.state.email)
      .then(() => {
        this.props.push('/')
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    const email = this.state.email
    return (
      <div className={styles.user}>
        <form onSubmit={this.handleSubmit} className={styles.content}>
          <h2 className={styles.header}>
            <FormattedMessage {...messages.title} />
          </h2>
          <div>
            <div className='input-label'>
              <FormattedMessage {...messages.email} />
            </div>
            <input
              type='text'
              name='email'
              autoComplete='username'
              value={email}
              onChange={this.handleChange}
              placeholder='Email'
            />
            <Button full wrapper type='submit' color='bright'>
              Reset
            </Button>
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

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(ForgotPassword)
