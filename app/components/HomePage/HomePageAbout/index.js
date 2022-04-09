import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import * as actions from 'containers/Members/actions'
import MemberImage from 'components/MemberImage'
import messages from './messages'
import styles from './styles.css'
import { prettyUserRole } from 'utils'
import placeholder from 'static/img/profile-placeholder.png'
import Button from '../../Button'
function HomePageAbout({ users, getUsers }) {
  const user = useMemo(() => users[Math.floor(Math.random() * users.length)], [
    users,
  ])
  useEffect(() => {
    if (!users || !users.length) {
      getUsers()
    }
  }, [])

  return !user || !Object.keys(user).length ? null : (
    <section className={styles.HomePageAbout}>
      <div className={styles.image}>
        <MemberImage
          picture={user.picture ? user.picture : placeholder}
          size={250}
          square
          round
        />
      </div>
      <div className={styles.information}>
        <h1 className={styles.name}>
          <FormattedMessage
            {...messages.headline}
            values={{ firstName: user.firstName }}
          />
        </h1>
        <p>
          <FormattedMessage
            {...messages.intro}
            values={{ firstName: user.firstName }}
          />
        </p>
        <Link className={styles.link} to='/about'>
          <Button color='homepage'>
            <FormattedMessage {...messages.link} />
          </Button>
        </Link>
      </div>
    </section>
  )
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users']).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

HomePageAbout.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.array,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageAbout)
