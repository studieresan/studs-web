import React, { useEffect } from 'react'
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
import { Facebook, Instagram, Linkedin } from 'react-feather'

const StudsMemberInfo = user => {
  const size = Math.max(Math.floor((window.innerWidth * 0.8) / 5) - 40, 100)
  return (
    <div key={user.id} className={styles.member}>
      <MemberImage picture={user.picture} size={size} square round />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <h5>{prettyUserRole(user.userRole)}</h5>
      <a
        href={
          user.linkedIn
            ? user.linkedIn
            : 'https://www.linkedin.com/company/studs/'
        }
      >
        <Linkedin color='#2867B2' size={20} />
      </a>
    </div>
  )
}

function About({ users, getUsers, selectedYear }) {
  useEffect(
    () => {
      if (!users || !users.length) {
        getUsers(selectedYear)
      }
    },
    [selectedYear]
  )
  return (
    <React.Fragment>
      <header className={styles.about_title}>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </header>
      <main className={styles.about}>{users.map(u => StudsMemberInfo(u))}</main>
      <Footer hasBackground />
    </React.Fragment>
  )
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
