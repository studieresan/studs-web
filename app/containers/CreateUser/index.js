import React from 'react'
import PropTypes from 'prop-types'
import { createUser } from '../../api'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import styles from './styles.css'
import messages from './messages'
import { formToObject, prettyUserRole } from '../../utils'
import { loadUserRoles } from '../../store/userRoles/actions'
import { hasData } from '../../store/salesTool/constants'
import { FormattedMessage } from 'react-intl'

class CreateUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMsg: '',
      successMsg: '',
      selectedMemberType: 'studs_member',
    }

    this.handleMemberChange = this.handleMemberChange.bind(this)
  }

  componentDidMount() {
    if (!hasData(this.props.userRoles)) {
      this.props.loadUserRoles()
    }
  }

  handleMemberChange(event) {
    this.setState({
      selectedMemberType: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const form = event.target

    this.setState({
      errorMsg: '',
      successMsg: '',
    })

    const formData = formToObject(form.elements)
    createUser(formData)
      .then(res => {
        form.reset()
        this.setState({
          successMsg: `Successfully created user ${res.email}!`,
        })
      })
      .catch(res => {
        if (!res.json) {
          console.error(res)
          return
        }

        return res.json().then(err => {
          let errorMsg
          if (Array.isArray(err)) {
            errorMsg = err.map(({ msg }) => msg).join(', ')
          } else {
            errorMsg = err.error
          }

          this.setState({
            errorMsg,
          })
        })
      })
  }

  render() {
    const { errorMsg, successMsg } = this.state
    const errorIsVisible = errorMsg && errorMsg !== ''
    const successIsVisible = successMsg && successMsg !== '' && !errorIsVisible

    return (
      <div className={styles.createUser}>
        <div className={styles.content}>
          <h2>
            <FormattedMessage {...messages.title} />
          </h2>

          {errorIsVisible && <div className={styles.errorMsg}>{errorMsg}</div>}

          {successIsVisible && (
            <div className={styles.successMsg}>{successMsg}</div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className={styles.formLabel}>
              <FormattedMessage {...messages.role} />
              <div>
                <select
                  name='user_role'
                  id='user_role'
                  defaultValue=''
                  required
                >
                  <option value={''} key={'empty'} disabled>
                    Select a user role
                  </option>
                  {Object.keys(this.props.userRoles.data).map(role => (
                    <option value={role} key={role}>
                      {prettyUserRole(role)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label>
              Email:
              <input
                type='email'
                placeholder='some@email.com'
                name='email'
                id='email'
                required
              />
            </label>

            <label>
              <FormattedMessage {...messages.firstName} />
              <input
                type='text'
                placeholder='Peter'
                name='firstName'
                id='firstName'
                required
              />
            </label>

            <label>
              <FormattedMessage {...messages.lastName} />
              <input
                type='text'
                placeholder='Niklasson'
                name='lastName'
                id='lastName'
                required
              />
            </label>

            <Button full type='submit'>
              <FormattedMessage {...messages.createButton} />
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

CreateUser.propTypes = {
  userRoles: PropTypes.object.isRequired,
  loadUserRoles: PropTypes.func.isRequired,
}

const mapStateToProps = rootState => {
  const userRoles = rootState.getIn(['userRoles'])

  return {
    userRoles,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUserRoles: () => dispatch(loadUserRoles()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUser)
