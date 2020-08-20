import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import sortBy from 'lodash/sortBy'
import * as actions from 'containers/Members/actions'
import styles from './styles.css'
import messages from './messages'
import Footer from 'components/Footer'
import MemberImage from 'components/MemberImage'
import { prettyUserRole } from 'utils'

const StudsMemberInfo = user => {
  const size = Math.max(Math.floor((window.innerWidth * 0.8) / 5) - 40, 100)
  return (
    <div key={user.firstName + user.lastName} className={styles.member}>
      <MemberImage picture={user.alternativePicture} size={size} square round />
      <h3
        style={{
          width: size,
        }}
      >
        {user.firstName} {user.lastName}
      </h3>
      <h5>{prettyUserRole(user.userRole)}</h5>
    </div>
  )
}

class About extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.selectedYear)
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
        <Footer hasBackground />
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
  selectedYear: PropTypes.number.isRequired,
}

About.defaultProps = {
  users: [],
}

function mapStateToProps(state) {
  const users = state.getIn(['members', 'users']).toJS()
  return {
    users: sortBy(users, ['firstName']),
    selectedYear: state.getIn(['salesTool', 'year']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
