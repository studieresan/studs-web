import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import messages from './messages'
import * as actions from './actions'
import styles from './styles.css'
import Button from 'components/Button'
import MemberImage from 'components/MemberImage'

export class User extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getUser()
    }
  }

  handleChange(event) {
    const user = {}
    if (event.target.type == 'file') {
      user[event.target.name] = event.target.files[0]
    } else {
      user[event.target.name] = event.target.value
    }

    this.props.update(user)
  }

  handleSubmit() {
    this.props.save(this.props.user)
  }

  renderError(err, key) {
    return (
      <div
        key={key}
        className={styles.status}>
        {err}
      </div>
    )
  }

  render() {
    const user = this.props.user

    return (
      <div className={styles.user}>
        <MemberImage className={styles.picture} picture={user.picture} size={150} square />
        <div className={styles.content}>
          <h2 className={styles.header}>
            <FormattedMessage {...messages.title} />
          </h2>
          { user.memberType === 'studs_member' &&
            <Link to={'/resume/edit'}>
              <Button full>
                Edit Resume
              </Button>
            </Link>
          }
          <div className='input-label'>
            <FormattedMessage {...messages.firstName} />
          </div>
          <input
            type='text'
            name='firstName'
            value={user.firstName}
            onChange={this.handleChange}
            onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
            placeholder='First name'
            maxLength='30'
          />
          <div className='input-label'>
            <FormattedMessage {...messages.lastName} />
          </div>
          <input
            type='text'
            name='lastName'
            value={user.lastName}
            onChange={this.handleChange}
            onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
            placeholder='Last name'
            maxLength='30'
          />
         { user.memberType === 'studs_member' &&
            <div>
              <div className='input-label'>
                <FormattedMessage {...messages.phone} />
              </div>
              <input
                type='text'
                name='phone'
                value={user.phone}
                onChange={this.handleChange}
                onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
                placeholder='Phone number'
                maxLength='30'
              />
              <div className='input-label'>
                <FormattedMessage {...messages.position} />
              </div>
              <input
                type='text'
                name='position'
                value={user.position}
                onChange={this.handleChange}
                onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
                placeholder='Position'
                maxLength='30'
              />
              <div className='input-label'>
                <FormattedMessage {...messages.master} />
              </div>
              <input
                type='text'
                name='master'
                value={user.master}
                onChange={this.handleChange}
                onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
                placeholder='Master'
                maxLength='30'
               />
              <div className='input-label'>
                <FormattedMessage {...messages.allergies} />
              </div>
              <input
                type='text'
                name='allergies'
                value={user.allergies}
                onChange={this.handleChange}
                onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
                placeholder='Allergies'
                maxLength='30'
              />
            </div>
          }
          <div className='input-label'>
            <FormattedMessage {...messages.password} />
          </div>
          <input
            type='password'
            name='password'
            value={user.password || ''}
            onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
            onChange={this.handleChange}/>
          <div className='input-label'>
            <FormattedMessage {...messages.confirmPassword} />
          </div>
          <input
            type='password'
            name='confirmPassword'
            value={user.confirmPassword || ''}
            onKeyPress={(e) => e.key === 'Enter' && this.handleSubmit()}
            onChange={this.handleChange}/>
          <Button full color='bright' onClick={this.handleSubmit}>
            Save
          </Button>
          { this.props.saved && // TODO translate
            <div className={styles.status}>
              Saved
            </div>
          }
          { this.props.saveError && // TODO translate
            <div className={styles.status}>
              Error, please try again later
            </div>
          }
          { this.props.passwordSaveErrors && // TODO translate
            this.props.passwordSaveErrors.map(this.renderError)
          }
        </div>
      </div>
    )
  }
}

User.propTypes = {
  saved: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  passwordSaveErrors: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {
    user,
    saved,
    saveError,
    passwordSaveErrors,
  } = state.getIn(['user']).toJS()
  return {
    user,
    saved,
    saveError,
    passwordSaveErrors,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
