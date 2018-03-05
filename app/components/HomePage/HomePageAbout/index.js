import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import * as actions from 'containers/Members/actions'
import MemberImage from 'components/MemberImage'
import messages from './messages'
import styles from './styles.css'

class HomePageAbout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }
  componentDidMount() {
    this.props.getUsers()

  }
  componentWillReceiveProps(nextProps) {
    if (this.state.user && this.state.user.firstName) {
      return
    }
    const { users } = nextProps
    const user = users[Math.floor(Math.random() * users.length)]
    this.setState({
      user,
    })
  }
  render() {
    const { user } = this.state
    if (!user) return null
    return (
      <div className={styles.HomePageAbout}>
        <div className={styles.image}>
          <MemberImage picture={user.picture} size='10rem' />
        </div>
        <div className={styles.information}>
          <h1 className={styles.name}>
            This is { user.firstName }
          </h1>
          <h5>{ user.position }</h5>
          <p>
            <FormattedMessage
              {...messages.intro}
              values={{firstName: user.firstName}} />
          </p>
          <p>
            <Link className={styles.link} to="/about">
              <FormattedMessage {...messages.link} />
            </Link>
          </p>
        </div>
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageAbout)
