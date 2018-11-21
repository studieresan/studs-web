import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import sortBy from 'lodash/sortBy'
import * as actions from 'containers/Members/actions'
import MemberHomePage from 'components/MemberHomePage'
import styles from './styles.css'
import messages from './messages'
import Footer from 'components/Footer/Footer'

class About extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { users } = this.props
    return (
      <div className='container'>
        <div className={styles.about}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
          <h4>
            <FormattedMessage {...messages.subtitle} />
          </h4>

          <div className={styles.members}>
            {users.map(user => (
              <MemberHomePage key={user.id} user={user} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

About.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
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
