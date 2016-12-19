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

export class PasswordReset extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.updatePassword(event.target.value);
  }

  handleSubmit(event) {
    this.props.reset(this.props.location.query.token);
  }

  render() {
    const { password, error, success } = this.props;
    return (
      <div className={styles.user}>
        <div className={styles.content}>
          <h1 className={styles.header}><FormattedMessage {...messages.title} /></h1>
          <div className='input-label'><FormattedMessage {...messages.password} /></div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            placeholder='Password'/>
          <div className='button-wrapper'>
            <button className='btn-bright' onClick={this.handleSubmit}>Save</button>
          </div>
          {error ? <div>Error</div> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.get('passwordReset').toJS();
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
