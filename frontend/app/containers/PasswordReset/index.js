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

  componentDidMount() {
    this.props.getUser(this.props.location.query.token);
  }

  handleChange(event) {
    const user = {};
    user[event.target.name] = event.target.value;
    this.props.update(user);
  }

  handleSubmit(event) {
    this.props.save();
  }

  render() {
    const user = this.props.user;
    console.log(user);
    return (
      <div className={styles.user}>
        <div className={styles.content}>
          <h1 className={styles.header}><FormattedMessage {...messages.title} /></h1>
          <div className='input-label'><FormattedMessage {...messages.password} /></div>
          <input
            type='text'
            name='password'
            value={ user.password }
            onChange={this.handleChange}
            placeholder='Password'/>
          <input
            type='hidden'
            name='token'
            value={this.props.location.query.token}
            onChange={this.handleChange}/>
          <div className='button-wrapper'>
            <button className='btn-bright' onClick={this.handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.get('user').toJS();
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
