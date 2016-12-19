/*
 *
 * User
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';
import * as actions from './actions';
import styles from './styles.css';

export class User extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if(this.props.user.firstName === '') {
      this.props.getUser();
    }
  }
  handleChange(event) {
    const user = {};
    if (event.target.type == 'file') {
      user[event.target.name] = event.target.files[0];
    } else {
      user[event.target.name] = event.target.value;
    }

    this.props.update(user);
  }
  handleSubmit(event) {
    this.props.save();
  }
  renderPicture(currentPicture) {
    if(currentPicture) {
      return (
        <img src={currentPicture} width={300} />
      );
    }
  }
  render() {
    const user = this.props.user;
    return (
      <div className={styles.user}>
        <div className={styles.content}>
          <h1 className={styles.header}><FormattedMessage {...messages.title} /></h1>
            <Link to={'members/' + user.id + '/resume/edit'} ><button className='btn-bright'>Edit Resume</button></Link>
          <div className='input-label'><FormattedMessage {...messages.firstName} /></div>
          <input
            type='text'
            name='firstName'
            value={user.firstName}
            onChange={this.handleChange}
            placeholder='First name'/>
          <div className='input-label'><FormattedMessage {...messages.lastName} /></div>
          <input
            type='text'
            name='lastName'
            value={user.lastName}
            onChange={this.handleChange}
            placeholder='Last name'/>
          <div className='input-label'><FormattedMessage {...messages.phone} /></div>
          <input
            type='text'
            name='phone'
            value={user.phone}
            onChange={this.handleChange}
            placeholder='Phone number'/>
          <div className='input-label'><FormattedMessage {...messages.position} /></div>
          <input
            type='text'
            name='position'
            value={user.position}
            onChange={this.handleChange}
            placeholder='Position'/>
          <div className='input-label'><FormattedMessage {...messages.master} /></div>
          <input
            type='text'
            name='master'
            value={user.master}
            onChange={this.handleChange}
            placeholder='Master'/>
          <div className='input-label'><FormattedMessage {...messages.allergies} /></div>
          <input
            type='text'
            name='allergies'
            value={user.allergies}
            onChange={this.handleChange}
            placeholder='Allergies'/>
          <div className='input-label'><FormattedMessage {...messages.picture} /></div>
          {this.renderPicture(user.currentPicture)}
          <input
            type='file'
            name='picture'
            onChange={this.handleChange}/>
          <div className='input-label'><FormattedMessage {...messages.password} /></div>
          <input
            type='password'
            name='password'
            onChange={this.handleChange}/>
          <div className='input-label'><FormattedMessage {...messages.passwordConfirm} /></div>
          <input
            type='password'
            name='passwordConfirm'
            onChange={this.handleChange}/>
          <div className='button-wrapper'>
            { this.props.saved ? <div>Saved</div> : <button className='btn-bright' onClick={this.handleSubmit}>Save</button> }
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
