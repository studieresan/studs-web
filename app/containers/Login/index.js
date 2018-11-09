import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'components/Button'
import { login } from '../App/actions'
import messages from './messages'
import styles from './styles.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pass: '',
    }
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.push('/')
    }
  }

  handleUserChange(event) {
    this.setState({ user: event.target.value })
  }

  handlePassChange(event) {
    this.setState({ pass: event.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login(this.state.user, this.state.pass)
  }

  renderError() {
    if (this.props.loginError) {
      return (
        <div className={styles.error}>
          <FormattedMessage {...messages.error} />
        </div>
      )
    }
  }

  render() {
    const { user, pass } = this.state
    return (
      <div className={styles.login}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <h1 className={styles.header}>
            <FormattedMessage {...messages.welcome} />
          </h1>

          <div className='input-label'>
            <FormattedMessage {...messages.email} />
          </div>
          <input
            type='email'
            value={user}
            autoComplete='username'
            onChange={this.handleUserChange}
          />

          <div className='input-label'>
            <FormattedMessage {...messages.password} />
          </div>
          <input
            type='password'
            value={pass}
            autoComplete='current-password'
            onChange={this.handlePassChange}
          />

          <Link to='/user/forgot-password'>
            <Button full>
              <FormattedMessage {...messages.forgotPassword} />
            </Button>
          </Link>
          <Button full type='submit' color='bright'>
            <FormattedMessage {...messages.login} />
          </Button>

          {this.renderError()}
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loginError: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    loggedIn: state.getIn(['global', 'loggedIn']),
    loginError: state.getIn(['global', 'loginError']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      login,
      push,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
