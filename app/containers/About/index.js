import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import sortBy from 'lodash/sortBy'
import { getUsers } from '../Members/actions'
import { setStudsYear } from '../../store/salesTool/actions'
import styles from './styles.css'
import messages from './messages'
import Footer from '../../components/Footer'
import MemberImage from '../../components/MemberImage'
import { prettyUserRole } from '../../utils'
import { Facebook, Instagram, Linkedin } from 'react-feather'
import { YearPicker } from '../../components/YearPicker'

const StudsMemberInfo = user => {
  const size = Math.max(Math.floor((window.innerWidth * 0.8) / 5) - 40, 100)
  return (
    <div key={user.id} className={styles.member}>
      <MemberImage picture={user.picture} size={size} square round />
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <h5>{prettyUserRole(user.userRole)}</h5>
      {user.linkedIn ? (
        <a href={user.linkedIn}>
          <Linkedin color='#2867B2' size={20} />
        </a>
      ) : (
        ''
      )}
    </div>
  )
}

function About({ users, getUsers, selectedYear, setStudsYear }) {
  useEffect(
    () => {
      getUsers(selectedYear)
    },
    [selectedYear]
  )
  return (
    <React.Fragment>
      <header className={styles.about_title}>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <YearPicker
          setStudsYear={year => setStudsYear(year)}
          selectedYear={selectedYear}
        />
      </header>
      <div className={styles.intro}>
        <p>
          <FormattedMessage {...messages.generalInformation} />
        </p>
      </div>
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
  setStudsYear: PropTypes.func.isRequired,
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
  return {
    getUsers: year => dispatch(getUsers(year)),
    setStudsYear: year => dispatch(setStudsYear(year)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)
