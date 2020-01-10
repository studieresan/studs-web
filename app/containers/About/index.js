import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import sortBy from 'lodash/sortBy'
import * as actions from 'containers/Members/actions'
import styles from './styles.css'
import messages from './messages'
import Footer from 'components/AboutAndEventFooter'
import MemberImage from 'components/MemberImage'
import { prettyUserRole } from 'utils'

const StudsMemberInfo = user => {
  if (!user.alternativePicture) return null
  return (
    <div key={user.lastName} className={styles.member}>
      <MemberImage
        picture={user.alternativePicture}
        size={Math.max(Math.floor((window.innerWidth * 0.8) / 5) - 40, 100)}
        square
        round
      />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <h5>{prettyUserRole(user.userRole)}</h5>
    </div>
  )
}

class About extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { users } = this.props
    return (
      <div>
        <div className={styles.about_title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        <div className={styles.about}>{users.map(u => StudsMemberInfo(u))}</div>
        <Footer />
      </div>
    )
  }
}

About.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      userRole: PropTypes.string.isRequired,
      picture: PropTypes.string,
    })
  ),
  getUsers: PropTypes.func.isRequired,
}

About.defaultProps = {
  users: [],
}

function mapStateToProps(state) {
  const users = state.getIn(['members', 'users']).toJS()
  return {
    users: sortBy(users, ['firstName']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
