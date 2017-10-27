import React, { Component, } from 'react'
import { browserHistory, Link, } from 'react-router'
import { FormattedMessage, } from 'react-intl'
import PropTypes from 'prop-types'
import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'
import { login, } from '../App/actions'
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
      browserHistory.push('/')
    }
  }

  handleUserChange(event) {
    this.setState({ user: event.target.value, })
  }

  handlePassChange(event) {
    this.setState({ pass: event.target.value, })
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
    const {
      user,
      pass,
    } = this.state
    return (
      <div className='center'>
        <form onSubmit={this.handleSubmit}>
          <h1 className={styles.header}>
            Welcome
          </h1>

          <div className='input-label'>Email</div>
          <input
            placeholder='Email'
            type='email'
            value={user}
            onChange={this.handleUserChange}
          />

          <div className='input-label'>Password</div>
          <input
            placeholder='Password'
            type='password'
            value={pass}
            onChange={this.handlePassChange}
          />

          <Link to="/user/forgot-password">Forgot password?</Link>

          <div className='button-wrapper'>
            <button type='submit' className='btn-bright'>Login</button>
          </div>
          { this.renderError() }
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loginError: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    loggedIn: state.getIn(['global', 'loggedIn', ]),
    loginError: state.getIn(['global', 'loginError', ]),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
