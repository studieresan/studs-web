import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { login } from '../../auth';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      error: false
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }
  
  handleUserChange(event) {
    this.setState({user: event.target.value});
  }

  handlePassChange(event) {
    this.setState({pass: event.target.value});
  }

  handleSubmit() {
    login(this.state.user, this.state.pass, ok => {
      if(ok) {
        this.setState({error: false});
        browserHistory.push('/');
      } else {
        this.setState({error: true});
      }
    })
    
  }

  renderError() {
    if(this.state.error) {
      return (
        <div className={styles.error}>
          <FormattedMessage {...messages.error} />
        </div>
      );
    }
  }

	render() {
    const {user, pass, error} = this.state;
		return (
		  <div className='center'>
        <div>
          <h1 className={styles.header}>Welcome</h1>
          <div className='input-label'>Email</div>
          <input placeholder='Email' type='email' value={user} onChange={this.handleUserChange} />
          <div className='input-label'>Password</div>
          <input placeholder='Password' type='password' value={pass} onChange={this.handlePassChange} />
          <div className='button-wrapper'>
            <button className='btn-bright' onClick={this.handleSubmit}>Login</button>
          </div>
          {this.renderError()}
        </div>
		  </div>
		);
	}
}

export default Login;
