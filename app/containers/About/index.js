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
import placeholder from 'static/img_new/profile-placeholder.png'
import { prettyUserRole } from 'utils'
import { StudentComponent } from 'components/Student/index'

const StudsMemberInfo = user => (
  <div className={styles.member}>
    <MemberImage
      picture={user.picture ? user.picture : placeholder}
      size={200}
      square
      round
    />
    <h3>
      {user.firstName} {user.lastName}
    </h3>
    <h5>{prettyUserRole(user.userRole)}</h5>
  </div>
)

class About extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { users } = this.props

    const chunkList = []
    const chunk = 4
    for (let i = 0; i < users.length; i += chunk) {
      chunkList.push(users.slice(i, i + chunk))
    }

    return (
      <div className='container'>
        <div className={styles.about}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
          <div className={styles.about_text}>
            <p>
              <FormattedMessage {...messages.intro} />
            </p>
          </div>
          <h2>
            <FormattedMessage {...messages.subtitle} />
          </h2>
          {!!chunkList.length &&
            chunkList.map((chunk, idx) => (
              <div className={styles.image_row} key={'chunk_' + idx}>
                {chunk.map(u => StudsMemberInfo(u))}
              </div>
            ))}
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
