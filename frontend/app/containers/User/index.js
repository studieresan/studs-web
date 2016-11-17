/*
 *
 * User
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectUser from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class User extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const user = {};
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      position: '',
      master: '',
      allergies: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const user = this.state;
    user[event.target.name] = event.target.value;
    this.setState(user);
  }
  handleSubmit() {
    console.log("Submit");
  }
  render() {
    const user = {};
    return (
      <div className={styles.user}>
        <div className={styles.content}>
          <h1 className={styles.header}>Edit Profile</h1>
          <div className='input-label'>First name</div>
          <input
            type='text'
            name='firstName'
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder='First name'/>
          <div className='input-label'>Last name</div>
          <input
            type='text'
            name='lastName'
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder='Last name'/>
          <div className='input-label'>Phone</div>
          <input
            type='text'
            name='phone'
            value={user.phone}
            onChange={this.handleChange}
            placeholder='Phone number'/>
          <div className='input-label'>Position</div>
          <input
            type='text'
            name='position'
            value={user.position}
            onChange={this.handleChange}
            placeholder='Position'/>
          <div className='input-label'>Master</div>
          <input
            type='text'
            name='master'
            value={user.master}
            onChange={this.handleChange}
            placeholder='Master'/>
          <div className='input-label'>Allergies</div>
          <input
            type='text'
            name='allergies'
            value={user.allergies}
            onChange={this.handleChange}
            placeholder='Allergies'/>
          <div className='button-wrapper'>
            <button className='btn-bright' onClick={this.handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectUser();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
