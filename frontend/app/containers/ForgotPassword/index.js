/*
 *
 * User password reset
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as actions from './actions';
import styles from './styles.css';
import { requestPasswordReset } from '../../api'

export default class ForgotPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {email: ''};
  }

  handleChange(event) {
    this.setState({email: event.target.value})
  }

  handleSubmit(event) {
    requestPasswordReset(this.state.email)
      .then(data => {
        this.setState({email: ''})
      })
      .catch(error => {
        console.log('???');
      });

  }

  render() {
    const email = this.state.email;
    return (
      <div className={styles.user}>
        <div className={styles.content}>
          <h1 className={styles.header}><FormattedMessage {...messages.title} /></h1>
          <div className='input-label'><FormattedMessage {...messages.email} /></div>
          <input
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange}
            placeholder='Email'/>
          <div className='button-wrapper'>
            <button className='btn-bright' onClick={this.handleSubmit}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}
